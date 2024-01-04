import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignForm() {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <div className="h-[600px] mx-auto flex flex-col justify-center space-y-6">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to log into your account
                </p>
            </div>
            <div className="grid mx-auto flex-col space-y-6 sm:w-[350px]">
                <form>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <Input
                                id="name"
                                placeholder="Name"
                                type="name"
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            <Input
                                id="password"
                                placeholder="********"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                disabled={isLoading}
                            />
                        </div>
                        <Button disabled={isLoading}>
                            {/* {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )} */}
                            Sign In
                        </Button>
                        <p className="mt-2">
                            Don't have an account yet? {' '}
                            <NavLink to="/auth" className='underline text-primary'>
                                Sign up
                            </NavLink>
                        </p>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={isLoading}>
                    {/* {isLoading ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    )}{" "} */}
                    Google
                </Button>
            </div>
        </div>
    )
}