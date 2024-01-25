import { useState, KeyboardEvent, FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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

import ItemService, { FetchedItems, Item } from '@/services/ItemService'
import { FetchedCollections } from '@/services/CollectionService'

interface ItemDialogProps {
    getCollection: () => void;
    title: string
    OldItem?: FetchedItems
    collection: FetchedCollections
    itemId?: string
}

const ItemDialog: FC<ItemDialogProps> = ({getCollection, title, collection, OldItem, itemId}) => {
    const location = useLocation()

    const [inputValue, setInputValue] = useState('')
    const [item, setItem] = useState<Item>({
        name: OldItem?.name || '',
        tags: OldItem?.tags || [],
        lastUpdate: new Date(),
        parentCollection: collection,
        extraFields: collection.extraFields
    })

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            if (!item.tags.includes(inputValue.trim())){
                setItem((prevItem) => ({
                    ...prevItem,
                    tags: [...prevItem.tags, inputValue.trim()],
                  }));
                setInputValue('')
            }
        }
    }

    const handleTagRemove = (indexToRemove: number) => {
        const updatedTags = item.tags.filter((_, index) => index !== indexToRemove)
        setItem({...item, tags: updatedTags})
    }

    async function onSubmit() {
        const collectionId = location.pathname.split('/').slice(-1)[0]
        try {
            if(itemId) {
                await ItemService.editItem(item, collectionId, itemId)
                    .then(() => getCollection())
            } else {
                await ItemService.addItemToCollection(item, collectionId)
                    .then(() => getCollection())
            }

            setItem({
                name: '',
                tags: [],
                lastUpdate: new Date(),
                parentCollection: collection,
                extraFields: collection.extraFields
            })
        } catch (e) {
          console.error(e)
        }
    }

    const handleFieldChange = (fieldIndex: number, value: string | number | boolean | Date) => {
        setItem((prevItem) => {
            const updatedExtraFields = [...prevItem.extraFields];
            updatedExtraFields[fieldIndex].value = value;

            return {
                ...prevItem,
                extraFields: updatedExtraFields,
            };
        });
    };

    useEffect(() => {
        setItem((prevItem) => ({
            ...prevItem,
            name: OldItem?.name || '',
            tags: OldItem?.tags || [],
            lastUpdate: new Date(),
        }));
    }, [OldItem]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='sm'>{title} Item</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Collection Item</DialogTitle>
                    <DialogDescription>
                        Configure your item here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                            <span className='text-red-600'>*</span>
                        </Label>
                        <Input
                            id="name"
                            value={item?.name}
                            className="col-span-3"
                            onChange={(e) => setItem({...item, 'name': e.target.value })}
                        />
                    </div>
                    {collection.extraFields.map((field, index) => (
                        <div className='grid grid-cols-4 items-center gap-4' key={field.label}>
                            <Label className="text-right capitalize">
                                {field.label}
                            </Label>
                            <Input
                                value={item.extraFields[index].value}
                                type={field.fieldType}
                                className="col-span-3"
                                onChange={(e) => handleFieldChange(index, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <div className='flex items-center'>
                        <Label htmlFor='tags' className='text-right mr-4'>
                        Tags
                    </Label>
                    <Input
                        type='text'
                        id='tags'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder='Add tags...'
                        className='col-span-3'
                    />
                    </div>
                    <div className='flex flex-wrap mt-1'>
                        {item.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                className='p-1 m-1 rounded cursor-pointer hover:bg-red-500 hover:text-white transition duration-500'
                                onClick={() => handleTagRemove(index)}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onSubmit}>Save Item</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ItemDialog;
