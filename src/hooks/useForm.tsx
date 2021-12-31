import { useEffect, useState } from "react";

export default function useForm(initialFields: any, validate: any, callback: any) {

    const [fields, setFields] = useState<any>(initialFields)
    const [errors, setErrors] = useState<any>({})
    const [isSubmitting, setIsSubmitting] = useState<any>(false)

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFields({ ...fields, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setErrors(validate(fields))
        setIsSubmitting(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting)
            callback();
    }, [errors])

    return { fields, setFields, errors, handleChange, handleSubmit }

}