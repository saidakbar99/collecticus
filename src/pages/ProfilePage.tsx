import { useAppSelector } from "@/hooks/redux"

const ProfilePage = () => {
    const { user } = useAppSelector(state => state.userReducer)

    return (
        <div className="mt-24">
            Profile: {user.id}
        </div>
    )
}

export default ProfilePage;
