// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

// interface User {
//     id: number;
//     name: string;
//     role: string;
//     active: boolean;
//   }

// const users: User[] = [
//     { id: 11, name: "Sam", role: "Admin", active: true },
//     { id: 19, name: "Kelly", role: "Salesperson", active: true },
//     { id: 23, name: "John", role: "Manager", active: false }
//   ];

// interface TableRowProps {
//     loading: boolean
//     user: User
// }

// function TableRow({ loading, user }: TableRowProps) {
//     const status = user.active ? 'Active' : 'Inactive'

//     return (
//         <tr>
//             <td>{loading ? <Skeleton /> : user.id}</td>
//             <td>{loading ? <Skeleton /> : user.name}</td>
//             <td>{loading ? <Skeleton /> : user.role}</td>
//             <td>{loading ? <Skeleton /> : status}</td>
//         </tr>
//     )
// }

// const TableSkeleton = () => {
//     return (
//         <div className="mb-4">
//             <h2>A Table with Theming</h2>
//             <SkeletonTheme
//                 baseColor="#5294e0"
//                 highlightColor="#96c7ff"
//                 borderRadius="0.5rem"
//                 duration={4}
//             >
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Role</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((u) => (
//                             <TableRow key={u.id} user={u} loading={true} />
//                         ))}
//                     </tbody>
//                 </table>
//             </SkeletonTheme>
//         </div>
//     )
// }

// export default TableSkeleton
import ContentLoader from "react-content-loader"

const MyLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <rect x="6" y="3" rx="0" ry="0" width="381" height="31" />
    <rect x="153" y="133" rx="0" ry="0" width="1" height="1" />
  </ContentLoader>
)

export default MyLoader