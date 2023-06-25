import React, {useState, useEffect, useRef} from 'react'
import {FaEye} from 'react-icons/fa'
import {HiOutlinePencilAlt, HiOutlineTrash} from 'react-icons/hi';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader';
import API from '../../hook/api';
import {numberWithCommas, formateDate, apiErrorHandler, setDocumentTitle} from '../../utils/helper';
import Button from '../../common/Button';
import AddEditModal from './AddeEdit'
import DeleteModal from './Delete';
import PageTitle from '../../components/PageTitle';
import Footer from '../../components/Footer';

export default function Employee() {
   const [employee, setEmployee] = useState("");
   const [keyword, setKeyword] = useState("")
   const [employees, setEmployees] = useState([])
   const [loading, setLoading] = useState(false);
   const [show, setShow] = useState(false);
   const [open, setOpen] = useState(false);
   const [action, setAction] = useState('')
   const [processId, setProcessId] = useState('');
   const [page, setPage] = useState(1)
   const searchRef = useRef()

   useEffect(() => {
     getEmployeeList()
     setDocumentTitle('Employee | CRUD operation with Virendra Arekar')
   },[])

   const getEmployeeList = async(employee  = '') => {
      setLoading(true)
      let option = employee === '' ? keyword : employee;

      await API.get(`/employees${option !== '' ? '?search='+option : ''}`)
      .then((response) => {
      
        if(response.status === 200){
            setPage(1)
            setEmployees(response.data.data)
        }
        else{
            toast.error(response.data.message)
        }
      })
      .catch((err) => {
        apiErrorHandler(err.response.data)

      })
        
      setLoading(false)
   }
  
   

 

   const handleChange = (e) => {
        const { value } = e.target;
        setEmployee(value);
   }

   const clearKeyword = () => {
      setEmployee('');
      window.location.reload();
   }

   if(loading){
      return <Loader />
   }



  const changePage = (selectedPage) => {
    const noOfPages = Math.ceil(employees.length / 10);
    console.log(noOfPages)
    console.log(page >= 1)
    console.log(selectedPage > page)
    console.log(selectedPage <= noOfPages)
    if(page >= 1 && selectedPage > page && selectedPage <= noOfPages){
        setPage(selectedPage)
    }
    else if(page > 1 && selectedPage !== 0 && selectedPage <= noOfPages){
        setPage(selectedPage)
    }
   
  }
  const actionHandle = (e, action, id = 0) => {
    e.preventDefault();
    setAction(action);
    if(action === 'Edit' || action === 'Add' || action === 'View'){
        if(action === 'Edit' || action === 'View'){
            setProcessId(id)
        }
        setOpen(false)
        setShow(true)
    }
    else{
        setShow(false)
        setOpen(true)
        setProcessId(id)
    }
  }
  const handleSearch = () =>{
    getEmployeeList(employee)
  }

  console.log('Employee',employees)
  return (
    <>
     
  
     <AddEditModal
          show={show}
          setShow={(val) => setShow(val)}
          setExit={() => {
            setShow(false)
            getEmployeeList()
          }}
          action={action}
          id={processId}
     />
     <DeleteModal
          open={open}
          setOpen={(val) => setOpen(val)}
          setExit={() => {
            setOpen(false)
            getEmployeeList()
          }}
          id={processId}
     />
     <div className='container mx-auto  p-12'>
        <PageTitle title="Employee Management(CRUD)" />
         <div className="flex flex-col">
            <div className="">
                <div className="flex justify-between py-3 pl-2">
                    <div>
                        <Button 
                        title="Add" 
                        onClick={(e) => actionHandle(e, 'Add')}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="relative border rounded-lg">
                            <label htmlFor="hs-table-search" className="sr-only">
                             Search
                            </label>
                           
                            <input
                                type="text"
                                value={employee}
                                onChange={handleChange}
                                ref={searchRef}
                                name="hs-table-search"
                                id="hs-table-search"
                                className="block w-full p-3 pl-10 text-sm border-gray-00 rounded-md focus:border-gray-500 focus:ring-gray-500"
                                placeholder="Search..."
                            />
                            {
                                employee.length > 0 &&
                                <button onClick={clearKeyword} className='text-xl absolute right-1 top-1 cursor-pointer'>x</button>
                            }
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="h-3.5 w-3.5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                        <Button title="Go" onClick={handleSearch}/>
                    </div>
                </div>

                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-x-auto border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-50">
                                <tr>
                                  
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        Position
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                    >
                                        Salary
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 "
                                    >
                                        Hire Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-xs font-bold text-center text-gray-500"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {
                                    employees.length > 0 && employees.slice(page * 10 - 10, page * 10).map((item, index) => {
                                        return(
                                            <tr>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                                                    {`${item.firstName} ${item.lastName}`}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                                                    {item.email}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                                                    {item.position}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                                   {numberWithCommas(item.salary)}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                                   {formateDate(item.hireDate)}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                    <div className="inline-block text-center">
                                                        <FaEye onClick={(e) => actionHandle(e,'View',item._id)} size={25} className="inline border border-gray-700 mx-1 rounded text-gray-700 cursor-pointer"/>
                                                        <HiOutlinePencilAlt onClick={(e) => actionHandle(e,'Edit',item._id)} size={25} className="inline border border-purple-800 mx-1 rounded text-purple-800 cursor-pointer"/>
                                                        <HiOutlineTrash onClick={(e) => actionHandle(e,'Delete',item._id)} size={25} className="inline border border-red-600 mx-1 rounded text-red-600 cursor-pointer"/>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                {/* <tr>
                                    <td className="py-3 pl-4">
                                        <div className="flex items-center h-5">
                                            <input
                                                type="checkbox"
                                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                            />
                                            <label
                                                htmlFor="checkbox"
                                                className="sr-only"
                                            >
                                                Checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                        1
                                    </td>
                                    <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                                        Jone Doe
                                    </td>
                                    <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                                        jonne62@gmail.com
                                    </td>
                                    <td className="px-6 py-4 text-sm text-left text-gray-800 whitespace-nowrap">
                                       Assistance Manager
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                       80000
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap">
                                       13 June 2023
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                        <div className="inline-block text-center">
                                            <FaEye onClick={(e) => actionHandle(e,'View',1)} size={25} className="inline border border-gray-700 mx-1 rounded text-gray-700 cursor-pointer"/>
                                            <HiOutlinePencilAlt onClick={(e) => actionHandle(e,'Edit',1)} size={25} className="inline border border-purple-800 mx-1 rounded text-purple-800 cursor-pointer"/>
                                            <HiOutlineTrash onClick={(e) => actionHandle(e,'Delete',1)} size={25} className="inline border border-red-600 mx-1 rounded text-red-600 cursor-pointer"/>
                                        </div>
                                    </td>
                                </tr> */}
                              
                            </tbody>
                        </table>
                    </div>

 
                    <nav aria-label="Page navigation example">
                        {
                            (employees.length > 0 && employees.length > 10) &&
                             <ul className="inline-flex -space-x-px my-8">
                                <li>
                                <button onClick={() => changePage(page -1)} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" {...page > 1 ? '' : 'disabled'}>Previous</button>
                                </li>
                                {
                                    [...Array(Math.ceil(employees.length/10))].map((_, i) => {
                                        return(
                                            <li key={i}>
                                            <button onClick={() => changePage(i + 1)} className={`${page === i + 1 ? 'px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-sm' : 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'} `}>{i+1}</button>
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                <button  onClick={() => changePage(page + 1)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" 
                                {...page < employees.length / 10 ? '' : 'disabled'}>Next</button>
                                </li>
                                
                            </ul> 
                        }
                        
                    </nav>

                </div>
            </div>
        </div>
        <Footer />
     </div>
    </>
  )
}
