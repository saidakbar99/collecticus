import { useNavigate } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const CollectionPage = () => {
    const navigate = useNavigate()
    return (
        < >
        <div className="grid grid-cols-3 mt-[72px] p-12">
            <div>
                <p className="text-4xl">Book Collection</p>
            </div>
            <div className="">
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card onClick={() => navigate('/item/123123')}>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                </CardHeader>
                <CardContent>
                    <CardTitle>Sherlock Holmes</CardTitle>
                    <CardDescription>Author: Saidakbar</CardDescription>
                </CardContent>
                <CardFooter>Likes: 5</CardFooter>
            </Card>
        </div>
        </>
    )
}

export default CollectionPage
