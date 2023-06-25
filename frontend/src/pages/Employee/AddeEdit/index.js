import React,{ useEffect, useState} from "react";
import Button from '../../../common/Button'
import {RxCross1} from 'react-icons/rx';
import API from "../../../hook/api";
import  toast  from 'react-hot-toast';
import {apiErrorHandler, setDateFormat} from '../../../utils/helper'


export default function Modal({show, setShow, setExit,action, id} ) {

  const [employee, setEmployee] = useState({
    firstName : '',
    lastName : '',
    email : '',
    position : '',
    salary : '',
    hireDate : ''
  })


  useEffect(() =>{
    if(action === 'Edit' || action === 'View'){
      getEmployeeInfo()
    }
    else{
      setEmployee({
        firstName : '',
        lastName : '',
        email : '',
        position : '',
        salary : '',
        hireDate : ''
      })
    }
  }, [id, action])

  const getEmployeeInfo = async() => {
    if(id !== ''){
      await API.get(`/employees/${id}`)
      .then((output) => {
        if(output.status === 200)
        {
          const {firstName, lastName, email, position, salary, hireDate} = output.data.data;
          const payload = {
            firstName : firstName,
            lastName : lastName,
            email : email,
            position : position,
            salary : Number(salary),
            hireDate : setDateFormat(hireDate)
          }
          setEmployee(payload)
        }
        else{
          alert(output.data.message)
        }
      })
      .catch((err) => {
        apiErrorHandler(err.response.data)
      })
      
    }
    else{
      setEmployee({
        firstName : '',
        lastName : '',
        email : '',
        position : '',
        salary : '',
        hireDate : ''
      })
    }
  }


  const submitHandler = async(e ) => {
   
     if(employee.firstName === '')
     {
      toast.error('First name is required!');
      return false;
     }
     else if(employee.firstName.length < 3){
      toast.error('First name should be greater than 2 character long.');
      return false;
     }
     else if(employee.lastName === '')
     {
      toast.error('Last name is required!');
      return false;
     }
     else if(employee.lastName.length < 3){
      toast.error('Last name should be greater than 2 character long.');
      return false;
     }
     else if(employee.email === '')
     {
      toast.error('Email name is required!');
      return false;
     }

     else if(! /\S+@\S+\.\S+/.test(employee.email)){
      toast.error('Invalid email address');
      return false;
     }
     else if(employee.position === '')
     {
      toast.error('Position is required!');
      return false;
     }
     else if(employee.position.length < 3){
      toast.error('Position should be greater than 2 character long.');
      return false;
     }
     else if(employee.salary === '')
     {
      toast.error('Salary is required!');
      return false;
     }
    //  else if(!isNumeric(Number(employee.salary))){
    //   toast.error('Salary should be number.');
    //   return false;
    //  }
     else if(employee.salary.length < 4){
      toast.error('Salary should be greater than 4 digit long.');
      return false;
     }
     else if(employee.hireDate === '')
     {
      toast.error('Hire date is required!');
      return false;
     }

     if(action === 'Add'){
        await API.post('/employees', employee)
        .then((response) => {
          if(response.status === 200){
            toast.success(response.data.message);
            setTimeout(() => {
              setExit()
            }, 500)
           }
           else{
            toast.error(response.data.message)
           }         
        })
        .catch((err) => {
          apiErrorHandler(err.response.data)
        })
     }
     else{
        await API.put(`/employees/${id}`, employee)
        .then((response) => {
          if(response.status === 200){
            toast.success(response.data.message);
            setTimeout(() => {
              setExit()
            }, 500)
           }
           else{
            toast.error(response.data.message)
           }         
        })
        .catch((err) => {
          apiErrorHandler(err.response.data)
        })
     }

    
     
     
  }

  
  const inputHandler = (event) => {
    const {name, value} = event.target;
    console.log(event.target.name);
    setEmployee({...employee, [name] : value});
  };


  return (
    <>
      {show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            
            <div className="relative w-full my-6 mx-4 max-w-xl">
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
                {/*header*/}
                <div className="flex items-start justify-between py-6 px-10 rounded-t">
                  <h5 className="text-xl font-bold ">
                    {action} Employee
                  </h5>
                  <button
                    className="ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShow(false)}
                  >
                    <RxCross1 className="text-gray-900 font-bold " size={25}/>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-10 flex-auto " >
                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2  text-left ml-1">First Name</label>
                        <input 
                        type="text" 
                        id="input-label" 
                        name="firstName"
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter first name"
                        value={employee.firstName}
                        onChange={inputHandler}
                        disabled={action === 'View' ? true : false}
                      
                        />
                   </div>

                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2 text-left ml-1">Last Name</label>
                        <input 
                        type="text" 
                        id="input-label" 
                        name="lastName"
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter last name"
                        value={employee.lastName}
                        onChange={inputHandler}
                        disabled={action === 'View' ? true : false}
                        />
                   </div>

                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2 text-left ml-1">Email</label>
                        <input 
                        type="email" 
                        id="input-label" 
                        name="email"
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter email address"
                        value={employee.email}
                        onChange={inputHandler}
                        disabled={action === 'View' ? true : false}
                        />
                   </div>

                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2 text-left ml-1">Position</label>
                        <input 
                        type="text" 
                        id="input-label" 
                        name="position"
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter position"
                        value={employee.position}
                        onChange={inputHandler}
                        disabled={action === 'View' ? true : false}
                        />
                   </div>

                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2 text-left ml-1">Salary</label>
                        <input 
                        type="number" 
                        id="input-label" 
                        name="salary"
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter salary"
                        value={employee.salary}
                        onChange={inputHandler}
                        disabled={action === 'View' ? true : false}
                        />
                   </div>

                   <div className="mb-2">
                      <label htmlFor="input-label" className="block text-md font-medium mb-2 text-left ml-1">Hire Date</label>
                        <input 
                        type="date" 
                        id="input-label" 
                        name="hireDate"
                        // pattern="\d{4}-\d{2}-\d{2}" 
                        className="py-3 px-4 h-12 block w-full border border-gray-200 rounded-2xl text-lg focus:border-gray-300" 
                        placeholder="Enter hiring date"
                        value={employee.hireDate}
                        onChange={inputHandler}
                        disabled={action === 'View' ? true : false}
                        />
                   </div>
                </div>
                {/*footer*/}
                {
                  action !== 'View' ?
                  <div className="flex items-center justify-end p-6  rounded-b">
                    <Button
                    title={action === 'Add' ? 'Submit' : 'Update'} 
                    onClick={submitHandler}
                    />
                  </div>
                  :
                  <div className="my-3"></div>
                }
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}