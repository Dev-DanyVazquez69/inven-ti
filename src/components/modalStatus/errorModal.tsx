interface errorModalProps {
    error: Error;
    onClose: () => void;
}

const ErrorModal: React.FC<errorModalProps> = ({ error, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="text-center bg-background rounded-lg shadow-lg h-1/3 md:h-3/5 w-3/4 max-w-2xl flex flex-col p-4 justify-around items-center border-4 border-white">
                <h1 className="font-bold text-lg text-red-500 md:text-4xl">Ocorreu um Erro!</h1>
                <p className="md:text-2xl">{((error as Error).message)}</p>
                <button
                    className="bg-red-600 p-2 rounded-lg text-white font-bold md:text-4xl"
                    onClick={() => onClose()}>Tentar novamente</button>
            </div>
        </div>
    )
}

export default ErrorModal;