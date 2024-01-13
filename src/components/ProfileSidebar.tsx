// import { usePathname } from "next/navigation"
// import { Link, useLocation } from "react-router-dom"
// import { cn } from "@/lib/utils"
// import { buttonVariants } from "@/components/ui/button"

// import { useAppSelector } from "@/hooks/redux"

// interface ProfileSidebarProps extends React.HTMLAttributes<HTMLElement> {
//   items: {
//     href: string
//     title: string
//   }[]
// }

// export function ProfileSidebar({ className, items, ...props }: ProfileSidebarProps) {
    export function ProfileSidebar() {
    // const location = useLocation();
    // const { user } = useAppSelector(state => state.userReducer)

    return (
        <div></div>
        // <nav
        // className={cn(
        //     "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        //     className
        // )}
        // {...props}
        // >
        // {items.map((item) => (
        //     <Link
        //     key={item.href}
        //     to={item.href + user.id}
        //     // className={cn(
        //     //   buttonVariants({ variant: "ghost" }),
        //     //   // pathname === item.href
        //     //   //   ? "bg-muted hover:bg-muted"
        //     //   //   : "hover:bg-transparent hover:underline",
        //     //   "justify-start"
        //     // )}
        //     className={cn(
        //         buttonVariants({ variant: "ghost" }),
        //         "justify-start",
        //         {
        //             "bg-muted hover:bg-muted": location.pathname === item.href,
        //             "hover:bg-transparent hover:underline": location.pathname !== item.href,
        //         },
        //     )}
        //     >
        //     {item.title}
        //     </Link>
        // ))}
        // </nav>
    )
}
