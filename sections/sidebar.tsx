import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import logout from "../functions/logout"
import checkAuth from "../hooks/useAuth"

const Sidebar = () => {

    const router = useRouter()
    
    const callAuth = useCallback(() =>  checkAuth(router), [])

    useEffect(() => {
        callAuth()
    }, [])

    return (
        <>
            <div className="flex flex-shrink flex-col py-4 px-3 bg-gray-50 rounded">
                <div>
                    <img
                        src="/images/logo-horizontal.svg"
                        alt="Logo @ Web Forest"
                        width='70%'
                        height={'70%'}
                        className='m-auto mt-1'
                    />
                </div>

                <ul className="space-y-2 mt-3">
                    <li>
                        <a href="/dashboard/user" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>                           
                        <span className="ml-3 whitespace-nowrap">Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="/dashboard/tree" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            <span className="flex-1 ml-3 whitespace-nowrap">Trees</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={logout} className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>                            
                            <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
                        </a>
                    </li>

                </ul>
            </div>
        </>
    )
}

export default Sidebar