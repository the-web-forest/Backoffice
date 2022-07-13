import { NextPage } from "next";
import Sidebar from "../../../../sections/sidebar";

const Dashboard: NextPage = () => {
    return (
        <div className='w-screen h-screen flex'>
            <Sidebar />
            <div className='flex flex-col w-screen m-5'>
               

                <div className='flex flex-row w-100 p-2 justify-between'>
                    <p className='text-4xl font-bold'>Create Tree</p>
                </div>

                <form method="POST" action="#" className='flex flex-col'>
                    <div className='flex flex-row'>
                        <div className='w-1/4 m-5'>
                            <label className="block text-sm font-bold text-gray-700" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                type="text" 
                                name="name" />
                        </div>

                        <div className='w-1/4 m-5'>
                            <label className="block text-sm font-bold text-gray-700" htmlFor="biome">
                                Biome
                            </label>

                            <input
                                id='biome'
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                type="text" 
                                name="biome" />
                        </div>

                        <div className='w-1/4 m-5'>
                            <label className="block text-sm font-bold text-gray-700" htmlFor="price">
                                Price
                            </label>

                            <input
                                id='price'
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                type="text" 
                                name="price" />
                        </div>
                    </div>

                    <div className="w-1/2 m-5">
                        <label className="block text-sm font-bold text-gray-700" htmlFor="password">
                            Description
                        </label>
                        <textarea name="description"
                            className="block resize-none w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            rows={4}></textarea>
                    </div>

                    <div className="flex items-center justify-start gap-x-2 m-5">
                        <button type="submit"
                            className="px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-wf-1 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300">
                            Save
                        </button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Dashboard