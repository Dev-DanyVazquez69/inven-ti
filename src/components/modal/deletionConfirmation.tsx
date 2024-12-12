import { Dispatch, SetStateAction } from "react";

interface DeleteConfirmationProps {
    functionDelete: () => void
    closeModal: Dispatch<SetStateAction<boolean>>
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ functionDelete, closeModal }) => {

    const deleteItem = () => {
        functionDelete()
        closeModal(false)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="text-center bg-background rounded-lg shadow-lg h-1/3 md:h-3/5 w-3/4 max-w-2xl flex flex-col p-4 justify-around items-center border-4 border-white">
                <h1 className="font-bold text-lg text-red-500 md:text-4xl">Tem certeza?!</h1>
                <p className="md:text-2xl">Clique para confirmar</p>
                <button
                    className="bg-red-600 p-2 rounded-lg text-white font-bold md:text-4xl"
                    onClick={() => deleteItem()}>CONFIRMAR</button>
            </div>
        </div>
    )
}

export default DeleteConfirmation;