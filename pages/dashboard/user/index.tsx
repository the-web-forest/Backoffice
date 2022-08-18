import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Paginator from "../../../components/paginator/paginator";
import Sidebar from "../../../sections/sidebar";
import ListUserUseCase from "../../../useCases/listUserUseCase/listUserUseCase";
import { UserList } from "../../../dtos/listUserResponse";
import Header from "../../../sections/header";

const listUserUseCase = new ListUserUseCase()

interface DashboardProps {
    page: number
}

const Dashboard: NextPage<DashboardProps> = ({ page }: DashboardProps) => {
    
    const router = useRouter()
    const [rows, setRows] = useState<UserList[]>([])
    const [currentPage, setCurrentPage] = useState<number>(page || 1)
    const [maxPage, setMaxPage] = useState<number>(0)

    useEffect(() => {
        if(!page) {
            router.push('?page='+currentPage)
        }
        
        listUserUseCase.run(currentPage).then(data => {
            setCurrentPage(data.currentPage)
            setRows(data.users)
            setMaxPage(data.totalPages)
        })

    }, [])

    return (
        <>
            <div className='w-screen h-screen flex'>
                <Header title="Users" />
                <Sidebar />
                <div className='flex flex-col w-screen m-5'>
                    <div className='flex flex-row w-100 p-2 justify-between'>
                        <p className='text-4xl font-bold'>Users</p>
                    </div>

                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3 h-auto mb-5">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Email
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        City/State
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(x => {
                                    return (
                                        <tr key={x.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                               {x.name}
                                            </th>
                                            <td className="py-4 px-6">
                                                {x.email}
                                            </td>
                                            <td className="py-4 px-6">
                                               {`${x.city}/${x.state}`}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <a href={`/dashboard/user/${x.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    <Paginator path={'/dashboard/user'} currentPage={currentPage} maxItems={5} maxPage={maxPage} />
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {

    const currentPage = context.query.page ?? null

    return {
      props: {
        page: currentPage
      }
    }
}

export default Dashboard