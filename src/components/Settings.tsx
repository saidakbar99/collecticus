import { Separator } from "@/components/ui/separator"

import { useAppSelector } from "@/hooks/redux"
import ProfileForm from '@/components/ProfileForm'

const Settings = () => {
    const { user } = useAppSelector(state => state.userReducer)

    return (
        // <ProfileLayout>
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile {user.username}</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <ProfileForm />
        </div>
        // </ProfileLayout>
    )
}

export default Settings;
