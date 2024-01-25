import { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import AuthService from '../services/AuthService'
import { useAppDispatch } from '@/hooks/redux'
import { saveUser } from '@/store/reducers/UserSlice'

export default function SignForm() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [isRegister, setIsRegister] = useState(false)
    const [accountData, setAccountData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const changeSignForm = () => {
        setIsRegister(!isRegister)
        setAccountData({
            username: '',
            email: '',
            password: ''
        })
    }

    const handleRegister = async () => {
        const { username, password, email } = accountData
        try {
            const response = await AuthService.registration(username, password, email)
                .then(async () => await AuthService.login(username, password))

            localStorage.setItem('token', response.data.accessToken)
            dispatch(saveUser(response.data.user))

            if (response.status === 200) {
                navigate(`/`)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleLogin = async () => {
        const { username, password } = accountData

        try {
            const response = await AuthService.login(username, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(saveUser(response.data.user))

            //!add shadcn toaster
            switch (response.status) {
                case 200:
                    navigate('/')
                    break
                case 400:
                    console.error('This user is blocked')
                    break
                default:
                    console.error('Wrong username/password')
            }
        } catch (e) {
            console.error('>>>', e)
        }
    }

    const handleEnterPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleRegister()
        }
    }

    const handleOnChange = (inputName: string, event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setAccountData({ ...accountData, [inputName]: value })
        //! Add validation
        // areInputsValid()
    }

    return (
        <div className='pt-12'>
            <div className='grid mx-auto space-y-6 sm:w-[400px] border px-10 pb-12 pt-6 rounded-xl bg-[#fafafa] dark:bg-gray-900 shadow-xl'>
                <h1 className='text-center text-2xl font-semibold tracking-tight'>
                    {isRegister ? 'Create an account' : 'Login into account'}
                </h1>
                <form>
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            { isRegister && (
                                <Input
                                    id='email'
                                    placeholder='name@example.com'
                                    type='email'
                                    autoCapitalize='none'
                                    // autoComplete='email'
                                    autoCorrect='off'

                                    value={accountData.email}
                                    onChange={(event) => handleOnChange('email', event)}
                                    onKeyDown={handleEnterPress}
                                    autoFocus
                                    required
                                />
                            )}
                            <Input
                                id='username'
                                placeholder='Username'
                                type='username'
                                autoCapitalize='none'
                                // autoComplete='username'
                                autoCorrect='off'

                                value={accountData.username}
                                onChange={(event) => handleOnChange('username', event)}
                                onKeyDown={handleEnterPress}
                                autoFocus
                                required
                            />
                            <Input
                                id='password'
                                placeholder='********'
                                type='password'
                                autoCapitalize='none'
                                // autoComplete='password'

                                value={accountData.password}
                                onChange={(event) => handleOnChange('password', event)}
                                onKeyDown={handleEnterPress}
                                autoFocus
                                required
                            />
                        </div>
                        <Button
                            type='button'
                            onClick={isRegister ? handleRegister : handleLogin}
                        >
                            Sign {isRegister ? 'Up' : 'In'}
                        </Button>
                        <p className='mt-2 flex cursor-pointer' onClick={changeSignForm}>
                            { isRegister ? 'Already have an account?' : 'Don\'t have an account yet?' }
                            <p className='ml-1 underline text-primary'>
                                Sign {isRegister ? 'up' : 'in'}
                            </p>
                        </p>
                    </div>
                </form>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-white dark:bg-gray-900 px-2 text-muted-foreground'>
                        Or continue with
                    </span>
                    </div>
                </div>
                <Button type='button' disabled>
                    Google (soon)
                </Button>
            </div>
        </div>
    )
}