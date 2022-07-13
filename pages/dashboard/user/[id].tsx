import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Sidebar from "../../../sections/sidebar";
import Header from "../../../sections/header";
import UserDetailDTO from "../../../dtos/user/detail/userDetail.dto";
import UserDetailUseCase from "../../../useCases/userDetailUseCase/userDetailUseCase";
import { format } from 'date-fns'

const userDetailUseCase = new UserDetailUseCase()

interface DashboardUserDetailsProps {
    id: string
}

const DashboardUserDetails: NextPage<DashboardUserDetailsProps> = ({ id }: DashboardUserDetailsProps) => {

    const router = useRouter()
    const [user, setUser] = useState<UserDetailDTO>(new UserDetailDTO({}))

    useEffect(() => {
        userDetailUseCase.run(id).then(data => {
            console.log(data)
            setUser(data)
        })
    })

    return (
        <>
            <div className='w-screen h-screen flex'>
                <Header title="Users" />
                <Sidebar />
                <div className='flex flex-col w-screen m-5'>
                    <div className='flex flex-row w-100 p-2 justify-between'>
                        <p className='text-4xl font-bold'>User Detail - {user.name}</p>
                    </div>

                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3 h-auto mb-5">
                        <form method="POST" action="#" className='flex flex-col'>
                            <div className='flex flex-row'>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="id">
                                        ID
                                    </label>
                                    <input
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        disabled={true}
                                        value={user.id}
                                        name="id" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="name">
                                        Name
                                    </label>
                                    <input
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        disabled={true}
                                        value={user.name}
                                        name="name" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="email">
                                        E-mail
                                    </label>

                                    <input
                                        id='email'
                                        disabled={true}
                                        value={user.email}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="email" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="email-verified">
                                        Email Verified
                                    </label>

                                    <input
                                        disabled={true}
                                        id='email-verified'
                                        value={user.emailVerified ? 'Yes' : 'No'}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="email-verified"
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row'>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="city">
                                        City
                                    </label>

                                    <input
                                        disabled={true}
                                        id='city'
                                        value={user.city}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="city" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="state">
                                        State
                                    </label>

                                    <input
                                        disabled={true}
                                        id='state'
                                        value={user.state}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="state" />
                                </div>

                                <div className='w-1/4 m-5'>
                                    <label className="block text-sm font-bold text-gray-700" htmlFor="created-at">
                                        Created At
                                    </label>

                                    <input
                                        disabled={true}
                                        id='created-at'
                                        value={user?.createdAt?.toString() ?? ''}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                                        value={user?.updatedAt?.toString() ?? ''}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 placeholder:text-right focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        type="text"
                                        name="updated-at"
                                    />
                                </div>


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