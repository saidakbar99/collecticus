import { Link } from "react-router-dom"
import { Boxes } from "lucide-react"

const Logo = () => {
    return (
        <div className="absolute right-1/2 translate-x-1/2">
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Boxes size={32} color="#3290FF" strokeWidth={1} />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Collecticus</span>
            </Link>
        </div>
    )
}

export default Logo
