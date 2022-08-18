import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import LoginUseCase from '../useCases/loginUseCase/loginUseCase'
import LoginDto from '../dtos/login.dto'
import Header from '../sections/header'

const loginUseCase = new LoginUseCase()

const Home: NextPage = () => {

  const router = useRouter()
  const [form, setForm] = useState<LoginDto>(new LoginDto())
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const validateForm = async (): Promise<boolean> => {
    
    setError('')
    
    if(!form.email || !form.password) {
      setError('Fill all fields')
      return false
    }

    return true
  
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(!validateForm()) {
      return
    }

    setIsLoading(true)
    loginUseCase.run(form).then(success => {
      router.push('/dashboard/user')
    }).catch(err => {
      setError('Invalid username or password')
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className="min-h-screen main-bg grid place-items-center h-screen">
    <Header title="Login"/>
    <form onSubmit={handleSubmit} className="h-auto w-80 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <img src="/images/logo-horizontal.svg" alt="Logo @ Web Forest" width='80%' className='m-auto mb-5' />
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input name="email" value={form?.email} onChange={(e) => setForm({ ...form, email: e.target.value })}  autoComplete='current-email' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"/>
      </div>
       
      <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input name="password" value={form?.password} onChange={(e) => setForm({ ...form, password: e.target.value })} autoComplete='current-password' className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
          <p className="text-red-500 text-xs italic">{error}</p>
      </div>

      <div className="items-center justify-between">
        <button disabled={isLoading} className="bg-wf-1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          {isLoading ? 'Carregando' : 'Login'}
        </button>
      </div>
      
    </form>
  </div>
  )
}

export default Home
