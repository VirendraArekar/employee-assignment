const mongoose  = require('mongoose');
const {isNil, omitBy}  = require('lodash');

const EmployeeSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    position : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    hireDate : {
        type : Date,
        required : true
    }
},{
    timestamps : true
});

EmployeeSchema.method({
    transform(){
        const transformed = {};
        const fields = ['id', 'firstName','lastName','email','position','salary','hireDate','createdAt'];

        fields.forEach((field) => {
        transformed[field] = this[field];
        });

        return transformed;
    }
});


EmployeeSchema.statics = {
    async list({page = 1, perPage = 25, firstName, lastName,email, position, salary, hireDate, search}){
    // const options = omitBy({page = 1, perPage = 25, firstName, lastName,email, position, salary, hireDate, search}, isNil);
    console.log(search)
    var options = {};
    if(search){
        options ={ $or: [
            {firstName: { $regex: new RegExp(search,'i') } },
            {lastName: { $regex: new RegExp(search,'i') }},
            {email: { $regex: new RegExp(search,'i') }},
            {position: { $regex: new RegExp(search,'i') }}
            ] };
    }

  
    return this.find(options)
                .sort({'createdAt' : -1})
                // .skip(perPage * (page - 1))
                // .limit(perPage)
                .exec()
    }
}


module.exports = mongoose.model('Employee', EmployeeSchema, 'employees');