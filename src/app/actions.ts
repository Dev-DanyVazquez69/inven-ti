'use server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createDevice(prevState: any, formData: FormData) {

    try {

        const rawFormData = Object.fromEntries(formData)
        
        const res = await fetch(url.(), {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rawFormData),
            method: 'POST'
        })

        if (!res.ok) {
            // Extrai e retorna a mensagem de erro da resposta, se possível
            const error = await res.json();
            return { message: error.message || 'Erro ao cadastrar dispositivo' };
        }

        const json = await res.json();
        console.log(json);

        return { message: 'Dispositivo cadastrado com sucesso', success: true };

    } catch (error) {
        console.error('Erro na criação do dispositivo:', error);
        return { message: 'Erro inesperado ao cadastrar o dispositivo', };
    }

}