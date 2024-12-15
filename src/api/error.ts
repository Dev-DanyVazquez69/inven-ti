
interface ErrorProps {
    success: boolean,
    erro: "Erro de validação" | "Erro desconhecido" | "Erro do banco de dados" | "Já existe um registro com este valor único" | "O registro solicitado não foi encontrado",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details: any
}

const handleFetchErrors = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorResponse: ErrorProps = await response.json();
        throw new Error(errorResponse.erro);
    }
    return response.json();
};

export default handleFetchErrors;