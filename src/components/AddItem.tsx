import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from '@/components/ui/dialog'

import ItemService, { Item } from '@/services/ItemService'

interface AddItemProps {
    getCollection: () => void;
}

const AddItem: React.FC<AddItemProps> = ({getCollection}) => {
    const collectionId = location.pathname.split('/').slice(-1)[0]
    const [item, setItem] = useState<Item>({
        name: '',
        tags: '',
        createdAt: new Date(),
        collectionId
    })

    async function onSubmit() {
        try {
            await ItemService.addItemToCollection(item)
                .then(() => getCollection())
        } catch (e) {
          console.error(e)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Collection Item</DialogTitle>
                    <DialogDescription>
                        Configure your item here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={item?.name}
                            className="col-span-3"
                            onChange={(e) => setItem({...item, 'name': e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Tags
                        </Label>
                        <Input
                            id="tags"
                            value={item?.tags}
                            className="col-span-3"
                            onChange={(e) => setItem({...item, 'tags': e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose>
                        <Button onClick={onSubmit}>Save Item</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddItem;
