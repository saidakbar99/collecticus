import { Separator } from "@/components/ui/separator"

import MyCollectionsList from "@/components/MyCollectionsList"

const MyCollections = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Collections</h3>
                <p className="text-sm text-muted-foreground">
                    This is how others will see you on the site.
                </p>
            </div>
            <Separator />
            <MyCollectionsList />
        </div>
    )
}

export default MyCollections;
