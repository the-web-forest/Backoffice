import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import Sidebar from "../../../sections/sidebar";
import Header from "../../../sections/header";
import TreeDetailUseCase from "../../../useCases/treeDetailUseCase/treeDetailUseCase";
import TreeDetailDTO from "../../../dtos/tree/detail/treeDetail.dto";
import CurrencyHelper from "../../../helpers/currencyHelper";
import UpdateTreeUseCase from "../../../useCases/updateTreeUseCase/updateTreeUseCase";
import NotificationService from "../../../helpers/NotificationService";

const treeDetailUseCase = new TreeDetailUseCase()
const updateTreeUseCase = new UpdateTreeUseCase()

interface DashboardUserDetailsProps {
    id: string
}

const DashboardUserDetails: NextPage<DashboardUserDetailsProps> = ({ id }: DashboardUserDetailsProps) => {

    const [tree, setTree] = useState<TreeDetailDTO>(new TreeDetailDTO({}))
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const updateTree = () => {
        treeDetailUseCase.run(id).then(data => {
            setTree(data)
        })
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if(tree.value <= 0) {
            return NotificationService.dangerNotification('Error!', 'Tree value must be positive')
        }

        setIsLoading(true)
        updateTreeUseCase.run(tree).then(data => {
            NotificationService.successNotification('Success!', 'Tree Updated Successfully')
            updateTree()
        }).catch(err => {
            NotificationService.dangerNotification('Error!', 'Error on Update Tree')
        }).finally(() => setIsLoading(false))
        
    }

    useEffect(() => {
        updateTree()
    }, [])

    return (
        <>
            <div className='w-screen h-screen flex'>
                <Header title="Tree Detail" />
                <Sidebar />
                <div className='flex flex-col w-screen m-5'>

                    <div className='flex flex-row w-100 p-2 justify-between'>
                        <p className='text-4xl font-bold'>Tree Details - {tree.name}</p>
                    </div>

                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3 h-auto mb-5">
                        <form method="POST" onSubmit={handleSubmit} className='flex flex-col'>
                            <div className='flex flex-row'>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="id">
                                        ID
                                    </label>

                                    <input
                                        className="bg-slate-100 block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        disabled={true}
                                        value={tree.id}
                                        name="id" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="created-at">
                                        Created At
                                    </label>

                                    <input
                                        disabled={true}
                                        id='created-at'
                                        value={new Date(tree?.createdAt).toLocaleString('pt-BR')}
                                        className="bg-slate-100 block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="created-at"
                                    />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="updated-at">
                                        Updated At
                                    </label>

                                    <input
                                        disabled={true}
                                        id='updated-at'
                                        value={new Date(tree?.updatedAt).toLocaleString('pt-BR')}
                                        className=" bg-slate-100 block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="updated-at"
                                    />
                                </div>

                            </div>

                            <div className='flex flex-row'>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        required={true}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        onChange={e => setTree({ ...tree, name: e.target.value })}
                                        value={tree.name}
                                        name="name" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="biome">
                                        Biome
                                    </label>
                                    <input
                                        required={true}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        onChange={e => setTree({ ...tree, biome: e.target.value })}
                                        value={tree.biome}
                                        name="biome"
                                        id="biome"
                                    />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="email">
                                        Value
                                    </label>

                                    <input
                                        required={true}
                                        placeholder="R$ 0.00"
                                        type={'text'}
                                        id={'value'}
                                        name={'value'}
                                        value={CurrencyHelper.mascaraMoeda(tree.value?.toString())}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        onChange={e => setTree({ ...tree, value: Number(e.target.value.replace(/\D/g, "")) })}
                                    />

                                </div>

                            </div>

                            <div className="flex flex-row">

                                <div className='w-1/2 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="description">
                                        Description
                                    </label>

                                    <textarea
                                        required={true}
                                        name="description"
                                        id="description"
                                        rows={10}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 resize-none"
                                        value={tree.description}
                                        onChange={e => setTree({ ...tree, description: e.target.value })}
                                    >

                                    </textarea>

                                </div>

                            </div>

                            <div className="flex items-center justify-start gap-x-2 m-5">
                                <button type="submit"
                                    disabled={isLoading}
                                    className={`px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-wf-1 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 ${isLoading ? 'cursor-not-allowed': ''} `}>
                                    Save
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {

    const id = context.params.id

    return {
        props: {
            id
        }
    }
}

export default DashboardUserDetails