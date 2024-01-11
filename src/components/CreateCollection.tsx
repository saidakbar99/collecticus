import { Separator } from "@/components/ui/separator"

import { CreateCollectionForm } from "./CreateCollectionForm"
// import ProfileLayout from '../components/ProfileLayout'

export default function CreateCollection() {
  return (
    // <ProfileLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <CreateCollectionForm />
      </div>
    // </ProfileLayout>
  )
}
