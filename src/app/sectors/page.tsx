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
import { useCreateSector, useDeleteSector, useFetchSectors, useUpdateSector } from "@/hooks/useSector";
import { bodySector } from "@/interfaces/sector";
import ModalFormItem from "@/components/modal/formItem";

const Sector: React.FC = () => {

    const formDataInit = {
        name: "",
    }

    const [formDataCreate, setFormDataCreate] = useState<bodySector>(formDataInit)
    const [formDataUpdate, setFormDataUpdate] = useState<bodySector>(formDataInit)

    const [modalCreate, setModalCreate] = useState<boolean>(false)
    const [modalUpdate, setModalUpdate] = useState<boolean>(false)

    const [itemDelete, setItemDelete] = useState<string>("")
    const [itemUpdate, setItemUpdate] = useState<{ id: string, name: string }>()

    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState<boolean>(false)

    const { mutate: mutateCreate, error: errorCreate, isSuccess, reset, isPending: pendingCreate } = useCreateSector(formDataCreate)
    const { mutate: mutateUpdate, error: errorUpdate, isPending: pendingUpdate } = useUpdateSector(formDataUpdate, itemUpdate?.id ?? "")
    const { data, isLoading, error } = useFetchSectors();
    const { error: errorDelete, mutate: mutateDelete, isPending: pendingDelete } = useDeleteSector(itemDelete)

    //função para atualização de um setor
    const handleUpdateSubmit = (data: Record<string, string | number>) => {
        console.log('Dados enviados:', data);
        const updatedData: { name: string } = {
            name: data.name as string,
        };
        setFormDataUpdate(updatedData)
        setModalUpdate(false);
        mutateUpdate()
    };
    //função para criação de um setor
    const handleCreateSubmit = (data: Record<string, string | number>) => {
        console.log('Dados enviados:', data);
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

    const deleteItem = (id: string) => {
        setItemDelete(id)
        setModalDeleteConfirmation(true)
    }

    const updateItem = (id: string, name: string) => {
        setItemUpdate({ id, name })
        setModalUpdate(true)
    }

    if (isLoading || pendingCreate || pendingDelete || pendingUpdate) return <LoadingRequest />;

    return (
        <>
            <Header title="Setores" />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <div className="flex w-full max-w-4xl flex-col">
                    {/* modal de criação */}
                    <ModalFormItem
                        isOpen={modalCreate}
                        onClose={() => setModalCreate(false)}
                        onSubmit={handleCreateSubmit}
                        title="Criar novo Setor"
                        fields={[
                            { label: "Nome", name: "name", type: "text", required: true },
                        ]} />
                    {/* modal de atualização */}
                    <ModalFormItem
                        isOpen={modalUpdate}
                        onClose={() => setModalUpdate(false)}
                        onSubmit={handleUpdateSubmit}
                        title="Atualizar Setor"
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
                        <h1>Lista de Setores</h1>
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
                            <p>{`Total: ${data.sectors.length}`}</p>
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
                                data?.sectors.length !== 0 ?
                                    data?.sectors.map((sector, index) => {
                                        return (
                                            <tr key={index} className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                                <td className="capitalize">{sector.name ?? "Não definido"}</td>
                                                <td className="capitalize">
                                                    <button onClick={() => updateItem(sector.id, sector.name)}>
                                                        <EditIcon />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteItem(sector.id)}>
                                                        <DeleteForeverIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                    :
                                    <tr className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                        <td className="">{"Não há setores cadastrados"}</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Sector;