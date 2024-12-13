"use client"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useCollaborator, useDeleteCollaborator } from "@/hooks/collaborator";
import FaceIcon from '@mui/icons-material/Face';
import { useState } from 'react'
import ModalUpdateItem from '../modal/updateItem';
import { useFilters } from '@/hooks/filters';
import DeleteConfirmation from '../modal/deletionConfirmation';

interface CollaboratorProps {
    CollaboratorId: string
}

const CollaboratorIdDetails: React.FC<CollaboratorProps> = ({ CollaboratorId }) => {

    const { data, isLoading, error, isSuccess } = useCollaborator(CollaboratorId)
    const [isModalUpdate, setModalUpdate] = useState<boolean>(false);
    const { data: dataFilter, isLoading: loadingFilter, error: errorFilter, isSuccess: successFilter } = useFilters()
    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState<boolean>(false)
    const { error: errorDelete, mutate: mutateDelete } = useDeleteCollaborator(CollaboratorId ?? "")


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdateSubmit = (data: Record<string, any>) => {
        console.log('Dados enviados:', data);
        setModalUpdate(false);
    };


    if (isLoading || loadingFilter) return <p>Carregando...</p>;
    if (error || errorFilter || errorDelete) return <p>Ocorreu um erro: {(error as Error).message}</p>;

    return (
        <div className="flex flex-1 flex-col w-full gap-5">
            {
                isSuccess && successFilter &&
                <>
                    <header className="flex w-full flex-col justify-center items-center">
                        {
                            modalDeleteConfirmation &&
                            <DeleteConfirmation closeModal={setModalDeleteConfirmation} functionDelete={mutateDelete} />
                        }
                        <ModalUpdateItem
                            fields={[
                                { label: "Nome", name: "name", type: "text", value: data?.collaborator.name, required: true },
                                {
                                    label: "Setor",
                                    name: "sectorId",
                                    type: "select",
                                    required: true,
                                    value: data?.collaborator.sector.name,
                                    options: dataFilter.filters.sectors.map((sector) => (
                                        { value: sector.id, label: sector.name }
                                    ))
                                }
                            ]}
                            isOpen={isModalUpdate}
                            onClose={() => setModalUpdate(false)}
                            onSubmit={handleUpdateSubmit}
                            title='Atualização do colaborador' />
                        <div className="relative w-24 h-24 rounded-full">
                            <FaceIcon height={50} width={50} />
                        </div>
                        <h1 className="font-black">{data?.collaborator.name}</h1>
                        <div className="flex w-full justify-end gap-3">
                            <button onClick={() => setModalUpdate(true)}>
                                <EditIcon />
                            </button>
                            <button onClick={() => setModalDeleteConfirmation(true)}>
                                <DeleteForeverIcon />
                            </button>
                        </div>
                    </header>
                    <section className="flex flex-col w-full gap-5 p-5 bg-foreground rounded-lg">
                        <div className="">
                            <h1 className="font-extrabold uppercase">Setor</h1>
                            <p>{data?.collaborator.sector?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Devices</h1>
                            {
                                data.collaborator.Device.length ?
                                    data.collaborator.Device.map((device, index) =>
                                        <div key={index} className=' text-center size-fit rounded-md capitalize p-1 bg-buttom'>
                                            <p>{device.name}</p>
                                        </div>
                                    ) :
                                    <p>O usuário não possui Dispositivos</p>
                            }
                        </div>
                    </section>
                </>
            }
        </div>
    )
}

export default CollaboratorIdDetails;