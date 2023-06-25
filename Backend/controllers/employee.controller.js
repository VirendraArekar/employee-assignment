const httpStatus = require('http-status');
const { omit } = require('lodash');
const Employee = require('../models/employee.model');
const { omitBy, isNil } = require('lodash');


exports.get = async(req, res, next) => {
    try{
        const employee = await Employee.findOne({_id : req.params.id});
        res.status(200).send({code : 200, message : 'Employee retrieve successfully.', data : employee});
      }
      catch(err){
        next(err);
      }
};


exports.create = async (req, res, next) => {

  try{
    await Employee.findOne({email : req.body.email})
    .then((data) => {
      if(data){
        res.status(403).send({code : 403, message : 'Validation Error', data : ['Email already exists.']})
      }
    })
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(200).send({code : 200, message : 'Employee created successfully.', data : savedEmployee});
  }
  catch(err){
    next(err);
  }
};



exports.update = async(req, res, next) => {
    try{
        await Employee.updateOne({_id : req.params.id} , req.body)
        .then(async(getEmployee) => {
            let findEmployee = await Employee.findOne({_id : req.params.id});
            res.status(200).send({code : 200, message : 'Employee updated successfully.', data : findEmployee});
        })
        .catch((err) => {
            res.status(400).send({code : 400, message : 'Employee not found.', data : err});
        })
      
      }
      catch(err){
        next(err);
      }
};


exports.list = async (req, res, next) => {
 try{
 
    const employees = await Employee.list(req.query);
    res.status(200).send({code : 200, message : 'Employee list retrieved', data : employees});
 }
 catch(err){
    next(err);
 }
};

exports.remove = async(req, res, next) => {
    try{
        await Employee.deleteOne({_id : req.params.id})
        .then((data) => {
            res.status(200).send({code : 200, message : 'Employee deleted successfully.', data : {}})
        })
        .catch((err) => {
            res.status(400).send({code: 400, message : 'Internal server error', data : err});
        })
    }
    catch(err){
      next(err);
    }
};
