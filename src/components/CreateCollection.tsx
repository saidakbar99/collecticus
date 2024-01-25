import { useState, useMemo, useCallback } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

import CollectionService, {Collections} from '@/services/CollectionService'
import { useAppSelector } from '@/hooks/redux'
import { TOPICS} from '@/config/config'
import { storage } from '@/config/firebase.config'
import ExtraFields from './ExtraFields'

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  topic: z
    .string({
      required_error: "Please select an topic.",
    }),
  description: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const CreateCollection = () => {
    const navigate = useNavigate()
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
    })
    const { user: {
        username,
        isAdmin,
        id
    } } = useAppSelector(state => state.userReducer)

    const [imageUpload, setImageUpload] = useState(null)
    const [collectionData, setCollectionData] = useState<Collections>({
        title: '',
        description: '',
        topic: '',
        items: [],
        createdAt: new Date(),
        image_url: '',
        extraFields: [],
        user: {
        username: username,
        isAdmin: isAdmin,
        _id: id
        }
    })

    //! upload when clicked Submit button
    const uploadImage = () => {
        if(imageUpload === null) return
        const imageRef = ref(storage, `/images/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setCollectionData({...collectionData, image_url: url})
            })
        })
    }

    async function onSubmit() {
        try {
            await CollectionService.createCollection(collectionData)
            navigate(`/collections/${id}`)
        } catch (e) {
        console.error(e)
        }
    }

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '200px',
            autofocus: true,
            placeholder: 'Введите текст...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
                uniqueId: collectionData.createdAt
            },
        }),
        [],
    )

    const onChange = useCallback((value: string) => {
        setCollectionData((prev) => ({...prev, description: value}))
    }, [])

    return (
        <Form {...form}>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <div className=''>
                    <FormField
                    control={form.control}
                    name="title"
                    render={() => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input
                                onChange={(e) => {
                                    setCollectionData({ ...collectionData, 'title': e.target.value })
                                }}
                                placeholder="Collection Name"
                            />
                        </FormControl>
                        <FormDescription>
                            This is public display name of your collection
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <Select
                                defaultValue={field.value}
                                onValueChange={(value: string) => {
                                    field.onChange
                                    setCollectionData({ ...collectionData, 'topic': value })
                                }}
                            >
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select from predefined topics" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {TOPICS.map((topic) => (
                                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={() => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                {/* <Textarea
                                    onChange={(e) => setCollectionData({ ...collectionData, 'description': e.target.value })}
                                    placeholder="Description of your collection. You can use markdown"
                                    className="resize-none"
                                /> */}
                                <SimpleMDE
                                    className='overflow-auto h-48'
                                    value={collectionData.description}
                                    onChange={onChange}
                                    options={options}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <div>
                        <input type="file" onChange={(event) => setImageUpload(event.target.files[0])} />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="mt-2"
                            onClick={uploadImage}
                        >
                            Add Image
                        </Button>
                    </div>
                </div>
                <div>
                    <ExtraFields collectionData={collectionData} setCollectionData={setCollectionData} />
                </div>
                <Button type="button" onClick={onSubmit}>Create Collection</Button>
            </form>
        </Form>
    )
}

export default CreateCollection