import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useRef, useState } from "react";
import TreeDetailDTO from "../../../../dtos/tree/detail/treeDetail.dto";
import CurrencyHelper from "../../../../helpers/currencyHelper";
import NotificationService from "../../../../helpers/NotificationService";
import Header from "../../../../sections/header";
import Sidebar from "../../../../sections/sidebar";
import CreateTreeUseCase from "../../../../useCases/createTreeUseCase/createTreeUseCase";

const createTreeUseCase = new CreateTreeUseCase()

const DashboardUserDetails: NextPage = () => {

    const router = useRouter()
    const [tree, setTree] = useState<TreeDetailDTO>(new TreeDetailDTO({}))
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const imgInput = useRef<any>()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if(!tree.value || tree.value <= 0) {
            return NotificationService.dangerNotification('Error!', 'Tree value must be positive')
        }

        if(!tree.image) {
            return NotificationService.dangerNotification('Error!', 'You should select a tree image')
        }

        setIsLoading(true)
        createTreeUseCase.run(tree)
        .then(data => {
            NotificationService.successNotification('Created!', 'Tree Created Sucessfully!', () => router.push('/dashboard/tree'))
        }).catch(err => {
            setIsLoading(false)
            NotificationService.dangerNotification('Error!', err.Message)
        })
        
    }

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const  convertBase64 = (file: any) => {
            return new Promise((resolve, reject) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file)
              fileReader.onload = () => {
                resolve(fileReader.result);
              }
              fileReader.onerror = (error) => {
                reject(error);
              }
            })
          }
        
        // @ts-ignore
        const file = event.target?.files[0]
        const base64 = await convertBase64(file) as string
        setTree({ ...tree, image: base64 })
    }

    const handleClick = (event: any) => {
        imgInput.current.click()
    }

    return (
        <>
            <div className='w-screen h-screen flex'>
                <Header title="Tree Detail" />
                <Sidebar />
                <div className='flex flex-col w-screen m-5'>

                    <div className='flex flex-row w-100 p-2 justify-between'>
                        <p className='text-4xl font-bold'>New Tree - {tree.name}</p>
                    </div>

                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3 h-auto mb-5">
                        <form method="POST" onSubmit={handleSubmit} className='flex flex-col'>

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
                                        name="name" 
                                        maxLength={50}
                                    />
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
                                        maxLength={50}
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
                                        value={CurrencyHelper.mascaraMoeda(tree.value?.toString() || "00")}
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

                                <div className='w-1/2 m-5'>
                                    
                                    <label className="block text-sm font-bold text-gray-700 mb-5" htmlFor="description">
                                    Image (click to upload)
                                    </label>
                                    
                                    <img 
                                        className="w-60 h-60 rounded-md cursor-pointer border-gray-300 border" 
                                        srcSet={tree.image || '/images/tree-placeholder.png'}
                                        onClick={e => handleClick(e)}
                                    />
                                    
                                    <input 
                                        onChange={(e) => handleImageChange(e)} 
                                        type="file" 
                                        className="hidden"
                                        ref={imgInput}
                                        name="image-hidden"
                                        accept="image/*"
                                    />

                                </div>

                            </div>

                            <div className="flex items-center justify-start gap-x-2 m-5">
                                <button disabled={isLoading} type="submit"
                                    className={`px-6 py-2 text-sm font-semibold rounded-md shadow-md text-sky-100 bg-wf-1 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 ${isLoading ? 'cursor-not-allowed' : ''}`}>
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

export default DashboardUserDetails