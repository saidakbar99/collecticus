import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import CollectionService from '@/services/CollectionService'
import { useAppSelector } from '@/hooks/redux'
import { useNavigate } from 'react-router-dom'

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

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  description: "It is description.",
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
}

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.userReducer)

  const [collectionData, setCollectionData] = useState({
    title: '',
    description: '',
    topic: 'Books',
    user: user.id
  })


  const { fields, append } = useFieldArray({
    name: "urls",
    control: form.control,
  })

  async function onSubmit() {
    try {
      const response = await CollectionService.createCollection(collectionData)
      navigate(`/collection/${response.data._id}`)
    } catch (e) {
      console.error(e)
    }
  }

  const topics = ['Books', 'Energy Drinks', 'Coins']

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                    onChange={(e) => setCollectionData({ ...collectionData, 'title': e.target.value })}
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
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                    onChange={(e) => setCollectionData({ ...collectionData, 'description': e.target.value })}
                    placeholder="Description of your collection. You can use markdown"
                    className="resize-none"
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="button" onClick={onSubmit}>Create Collection</Button>
      </form>
    </Form>
  )
}
