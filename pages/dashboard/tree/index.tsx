import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Paginator from "../../../components/paginator/paginator";
import Sidebar from "../../../sections/sidebar";
import Header from "../../../sections/header";
import ListTreeUseCase from "../../../useCases/listTreeUseCase/listTreeUseCase";
import { TreeList } from "../../../dtos/tree/listTreeResponse";
import CurrencyHelper from "../../../helpers/currencyHelper";

const listUserUseCase = new ListTreeUseCase()

interface DashboardTreeProps {
    page: number
}

const Dashboard: NextPage<DashboardTreeProps> = ({ page }: DashboardTreeProps) => {

    const router = useRouter()
    const [rows, setRows] = useState<TreeList[]>([])
    const [currentPage, setCurrentPage] = useState<number>(page || 1)
    const [maxPage, setMaxPage] = useState<number>(0)
    const [showModal, setShowModal] = useState<boolean>(false)

    const [treeToDelete, setTreeToDelete] = useState<TreeList>()

    useEffect(() => {
        if (!page) {
            router.push('?page=' + currentPage)
        }

        listUserUseCase.run(currentPage).then(data => {
            setCurrentPage(data.currentPage)
            setRows(data.trees)
            setMaxPage(data.totalPages)
        })

    }, [])

    const deleteTree = (treeId: string) => {
        const tree = rows.find(x => x.id === treeId)
        setTreeToDelete(tree)
        setShowModal(true)
    }

    return (
        <>
            <div className='w-screen h-screen flex'>
                <Header title="Users" />
                <Sidebar />
                <div className='flex flex-col w-screen m-5'>


                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                            <h3 className="text-3xl font-semibold">
                                                Delete Tree?
                                            </h3>
                                            <button
                                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                    ×
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                               Do you really want to delete <b>{treeToDelete?.name}</b> ?
                                            </p>
                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                            <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}


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
                                        <span className="sr-only">View</span>
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        <span className="sr-only">Delete</span>
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
                                                {x.biome}
                                            </td>
                                            <td className="py-4 px-6">
                                                {'R$ ' + CurrencyHelper.mascaraMoeda(`${x.value}`)}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <a href={`/dashboard/tree/${x.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</a>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <a onClick={() => deleteTree(x.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Delete</a>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                    <Paginator path={'/dashboard/tree'} currentPage={currentPage} maxItems={5} maxPage={maxPage} />
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