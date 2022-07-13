import { NextPage } from "next";
import Sidebar from "../../../sections/sidebar";

const Dashboard: NextPage = () => {
    return (

        <div className='w-screen h-screen flex'>
            <Sidebar />
            <div className='flex flex-col w-screen m-5'>
                <div className='flex flex-row w-100 p-2 justify-between'>
                    <p className='text-4xl font-bold'>Trees</p>
                    <button className="bg-wf-1 text-white py-1 px-4 rounded">
                        <a href="/dashboard/tree/create">New Tree</a>
                    </button>
                </div>

                <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3 h-auto mb-5">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Name
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Biome
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Price
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {new Array(100).fill(10).map(x => {
                                return (
                                    <tr key={x} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Apple MacBook Pro 17"
                                        </th>
                                        <td className="py-4 px-6">
                                            Sliver
                                        </td>
                                        <td className="py-4 px-6">
                                            R$ 2999
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <a href="/dashboard/tree/42" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>


            </div>

        </div>
    )
}

export default Dashboard