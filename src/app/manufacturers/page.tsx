"use client"

import { Header } from "@/components/header/header"
import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SuccessModal from "@/components/modal/successApi";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteConfirmation from "@/components/modal/deletionConfirmation";
import EditIcon from '@mui/icons-material/Edit';
import ErrorDisplay from "../../components/getErrorsMessage";
import LoadingRequest from "@/components/loadingApi";
import { useCreateManufacturer, useDeleteManufacturer, useFetchManufacturers, useUpdateManufacturer } from "@/hooks/useManufacturer";
import { ManufacturerBody } from "@/interfaces/manufacturer";
import ModalFormItem from "@/components/modal/formItem";

const Manufacturer: React.FC = () => {

    const formDataInit = {
        name: "",
    }

    const [formDataCreate, setFormDataCreate] = useState<ManufacturerBody>(formDataInit)
    const [formDataUpdate, setFormDataUpdate] = useState<ManufacturerBody>(formDataInit)

    const [modalCreate, setModalCreate] = useState<boolean>(false)
    const [modalUpdate, setModalUpdate] = useState<boolean>(false)

    const [itemDelete, setItemDelete] = useState<number>()
    const [itemUpdate, setItemUpdate] = useState<{ id: number, name: string }>()

    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState<boolean>(false)

    const { mutate: mutateCreate, error: errorCreate, isSuccess, reset } = useCreateManufacturer(formDataCreate)
    const { mutate: mutateUpdate, error: errorUpdate } = useUpdateManufacturer(formDataUpdate, itemUpdate?.id ?? 0)
    const { data, isLoading, error } = useFetchManufacturers();
    const { error: errorDelete, mutate: mutateDelete } = useDeleteManufacturer(itemDelete ?? 0)

    //função para atualização de um setor
    const handleUpdateSubmit = (data: Record<string, string | number>) => {
        const updatedData: { name: string } = {
            name: data.name as string,
        };
        setFormDataUpdate(updatedData)
        setModalUpdate(false);
        mutateUpdate()
    };
    //função para criação de um setor
    const handleCreateSubmit = (data: Record<string, string | number>) => {
        const createData: { name: string } = {
            name: data.name as string,
        };
        setFormDataCreate(createData)
        setModalCreate(false);
        mutateCreate()
    };

    const closeModalStatus = () => {
        setFormDataCreate(formDataInit)
        reset()
    }

    const deleteItem = (id: number) => {
        setItemDelete(id)
        setModalDeleteConfirmation(true)
    }

    const updateItem = (id: number, name: string) => {
        setItemUpdate({ id, name })
        setModalUpdate(true)
    }

    if (isLoading) return <LoadingRequest />;

    return (
        <>
            <Header title="Marcas" />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <div className="flex w-full max-w-4xl flex-col">
                    {/* modal de criação */}
                    <ModalFormItem
                        isOpen={modalCreate}
                        onClose={() => setModalCreate(false)}
                        onSubmit={handleCreateSubmit}
                        title="Criar nova Marca"
                        fields={[
                            { label: "Nome", name: "name", type: "text", required: true },
                        ]} />
                    {/* modal de atualização */}
                    <ModalFormItem
                        isOpen={modalUpdate}
                        onClose={() => setModalUpdate(false)}
                        onSubmit={handleUpdateSubmit}
                        title="Atualizar Marca"
                        fields={[
                            { label: "Nome", name: "name", type: "text", value: itemUpdate?.name, required: true },
                        ]} />
                    <ErrorDisplay errors={[error, errorDelete, errorCreate, errorUpdate]} />
                    {isSuccess && (
                        <SuccessModal
                            message="A operação foi concluída com sucesso!"
                            onFinally={() => closeModalStatus()}
                        />
                    )}
                    {
                        modalDeleteConfirmation &&
                        <DeleteConfirmation closeModal={setModalDeleteConfirmation} functionDelete={mutateDelete} />
                    }
                    <div className="py-10 text-center w-full font-extrabold">
                        <h1>Lista de Marcas</h1>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <button
                            onClick={() => setModalCreate(true)}
                            className="flex gap-2">
                            <AddCircleOutlineIcon />
                            <p>Adicionar</p>
                        </button>
                        {
                            data &&
                            <p>{`Total: ${data.manufacturers.length}`}</p>
                        }
                    </div>

                </div>
                <div className="flex w-full max-w-4xl flex-col bg-foreground rounded-xl items-end">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-bold bg-buttom rounded-xl h-10 border-white text-xs sm:text-base">
                                <th>Nome</th>
                                <th>Atualizar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.manufacturers.length !== 0 ?
                                    data?.manufacturers.map((Manufacturer, index) => {
                                        return (
                                            <tr key={index} className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                                <td className="">{Manufacturer.name ?? "Não definido"}</td>
                                                <td className="">
                                                    <button onClick={() => updateItem(Manufacturer.id, Manufacturer.name)}>
                                                        <EditIcon />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteItem(Manufacturer.id)}>
                                                        <DeleteForeverIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                    :
                                    <tr className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                        <td className="">{"Não há Marcas cadastradas"}</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Manufacturer;