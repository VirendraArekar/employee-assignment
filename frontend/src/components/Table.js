import React from "react";
import {FaEye} from 'react-icons/fa'
import {HiOutlinePencilAlt, HiOutlineTrash} from 'react-icons/hi'

export default function Table() {
    const changePage = (page) => {

    }
    return (
        <div className="flex flex-col">
            <div className="">
                <div className="flex justify-end py-3 pl-2">
                    <div className="flex items-center space-x-2">
                        <div className="relative border rounded-lg">
                            <label htmlFor="hs-table-search" className="sr-only">
                             Search
                            </label>
                            <input
                                type="text"
                                name="hs-table-search"
                                id="hs-table-search"
                                className="block w-full p-3 pl-10 text-sm border-gray-00 rounded-md focus:border-gray-500 focus:ring-gray-500"
                                placeholder="Search..."
                            />
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
                    </div>
                </div>

                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="table-auto min-w-full divide-y divide-gray-200 ">
                            <thead className="bg-gray-50">
                                <tr>
                                    {/* <th scope="col" className="py-3 pl-4">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="checkbox-all"
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
                                    </th> */}
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
                                <tr>
                                    {/* <td className="py-3 pl-4">
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
                                    </td> */}
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
                                            <FaEye size={25} className="inline border border-gray-700 mx-1 rounded text-gray-700"/>
                                            <HiOutlinePencilAlt  size={25} className="inline border border-purple-800 mx-1 rounded text-purple-800"/>
                                            <HiOutlineTrash size={25} className="inline border border-red-600 mx-1 rounded text-red-600"/>
                                        </div>
                                    </td>
                                </tr>
                              
                            </tbody>
                        </table>
                    </div>

                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px my-8">
                            <li>
                            <button onClick={() => changePage(10)} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">Previous</button>
                            </li>
                            <li>
                            <button onClick={() => changePage(10)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">1</button>
                            </li>
                            <li>
                            <button onClick={() => changePage(10)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">2</button>
                            </li>
                            <li>
                            <button onClick={() => changePage(10)}  aria-current="page" className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 text-sm">3</button>
                            </li>
                            <li>
                            <button onClick={() => changePage(10)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</button>
                            </li>
                            <li>
                            <button  onClick={() => changePage(10)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">5</button>
                            </li>
                            <li>
                            <button  onClick={() => changePage(10)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">Next</button>
                            </li>
                        </ul>
                        </nav>

                </div>
            </div>
        </div>
    );
}