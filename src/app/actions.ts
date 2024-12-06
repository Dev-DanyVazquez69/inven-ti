'use server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createDevice(prevState: any, formData: FormData) {
    const rawFormData = Object.fromEntries(formData)
    const res = await fetch('https://...', {
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(rawFormData),
        method: 'POST'
    })
    const json = await res.json()

    if (!res.ok) {
        return { message: 'Please enter a valid body' }
    }

    console.log(json)
}