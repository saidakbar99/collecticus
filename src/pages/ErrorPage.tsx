import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-grow items-center justify-center'>
            <div className='rounded-lg p-8 text-center shadow-xl border '>
                <h1 className='mb-4 text-4xl font-bold'>404</h1>
                <p>Oops! The page you are looking for could not be found.</p>
                <Button type='button' className='mt-4 rounded' onClick={() => navigate('/')}>
                    Go back to Home
                </Button>
            </div>
        </div>
    )
}

export default ErrorPage
