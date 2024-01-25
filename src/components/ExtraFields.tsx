import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Collections } from '@/services/CollectionService'

interface ExtraFieldsProps {
    collectionData: Collections
    setCollectionData: React.Dispatch<React.SetStateAction<Collections>>;
}

const ExtraFields: React.FC<ExtraFieldsProps> = ({setCollectionData, collectionData}) => {
    const [selectedFieldType, setSelectedFieldType] = useState('')
    const [extraFieldLabel, setExtraFieldLabel] = useState('')

    const handleFieldTypeChange = (value: string) => {
        setSelectedFieldType(value)
    }

    const handleAddField = () => {
        setCollectionData((prev) => ({
            ...prev,
            extraFields: [
                ...prev.extraFields,
                { fieldType: selectedFieldType, label: extraFieldLabel, value: '' }
            ]
        }))
        setExtraFieldLabel('')
    }

    return (
        <>
            <div className='flex mb-2'>
                <div className='w-full'>
                    <Label htmlFor='addExtraFieldBtn'>Add Extra Fields</Label>
                    <div className='flex mt-2'>
                        <Input
                            id='addExtraFieldBtn'
                            type='text'
                            placeholder='Extra Field Label'
                            value={extraFieldLabel}
                            onChange={(e) => setExtraFieldLabel(e.target.value)}
                        />
                        <Select onValueChange={(value) => handleFieldTypeChange(value)}>
                            <SelectTrigger className='w-[150px]' >
                                <SelectValue placeholder='Type' />
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value='string'>String</SelectItem>
                                <SelectItem value='number'>Number</SelectItem>
                                <SelectItem value='date'>Date</SelectItem>
                                <SelectItem value='boolean'>Boolean</SelectItem>
                                <SelectItem value='textarea'>Textarea</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <Button
                type='button'
                onClick={handleAddField}
                disabled={!selectedFieldType || !extraFieldLabel}
            >
                Add Field
            </Button>
            <Separator className='my-4'/>

            {collectionData.extraFields.map((field, index) => (
                <div key={index} className='mt-4'>
                    {field.fieldType === 'string' && (
                        <>
                            <Label className='capitalize' htmlFor={field.fieldType + field.label}>{field.label}</Label>
                            <Input type='text' disabled />
                        </>
                    )}
                    {field.fieldType === 'number' && (
                        <>
                            <Label className='capitalize' htmlFor={field.fieldType + field.label}>{field.label}</Label>
                            <Input type='number' disabled />
                        </>
                    )}
                    {field.fieldType === 'date' && (
                        <>
                            <Label className='capitalize' htmlFor={field.fieldType + field.label}>{field.label}</Label>
                            <Input type='date' disabled />
                        </>
                    )}
                    {field.fieldType === 'boolean' && (
                        <>
                            <Label className='capitalize' htmlFor={field.fieldType + field.label}>{field.label}</Label>
                            <Input type='checkbox' disabled />
                        </>
                    )}
                    {field.fieldType === 'textarea' && (
                        <>
                            <Label className='capitalize' htmlFor={field.fieldType + field.label}>{field.label}</Label>
                            <Textarea disabled />
                        </>
                    )}
                </div>
            ))}
        </>
    )
}

export default ExtraFields
