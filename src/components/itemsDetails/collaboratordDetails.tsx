"use client"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useCollaborator, useDeleteCollaborator, useUpdateCollaborator } from "@/hooks/useCollaborator";
import BadgeIcon from '@mui/icons-material/Badge'; import { useEffect, useState } from 'react'
import ModalFormItem from '../modal/formItem';
import { useFilters } from '@/hooks/useFilters';
import DeleteConfirmation from '../modal/deletionConfirmation';
import { redirect } from 'next/navigation';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Link from 'next/link';
import ErrorDisplay from '@/components/getErrorsMessage';
import LoadingRequest from '../loadingApi';

interface CollaboratorProps {
    collaboratorId: string
}

const CollaboratorIdDetails: React.FC<CollaboratorProps> = ({ collaboratorId }) => {

    const [isModalUpdate, setModalUpdate] = useState<boolean>(false);
    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState<boolean>(false)
    const [dataUpdateCollaborator, setDataUpdateCollaborator] = useState<{ name: string, sectorId: string }>({ name: "", sectorId: "" })

    const { data, isLoading, error, isSuccess } = useCollaborator(collaboratorId)
    const { data: dataFilter, isLoading: loadingFilter, error: errorFilter, isSuccess: successFilter } = useFilters()
    const { error: errorDelete, mutate: mutateDelete, isSuccess: successDelete, isPending: pendingDelete } = useDeleteCollaborator(collaboratorId ?? "")
    const { error: errorUpdate, mutate: mutateUpdate, isPending: pendingUpdate } = useUpdateCollaborator(dataUpdateCollaborator, collaboratorId)


    //função que recebe os dados do formulário de atualização e envia para a API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdateSubmit = (data: Record<string, any>) => {
        console.log('Dados enviados:', data);
        const updatedData: { name: string; sectorId: string } = {
            name: data.name as string,
            sectorId: data.sectorId as string,
        };
        setDataUpdateCollaborator(updatedData)
        setModalUpdate(false);
        mutateUpdate()
    };

    //use effect para enviar o usuário a tela de todos os colaboradores após a exclusão
    useEffect(() => {
        if (successDelete) {
            redirect("/collaborators");
        }
    }, [successDelete]);


    if (isLoading || loadingFilter || pendingDelete || pendingUpdate) return <LoadingRequest />

    return (
        <div className="flex flex-1 flex-col w-full gap-5">
            <ErrorDisplay errors={[error, errorFilter, errorDelete, errorUpdate]} />
            {
                isSuccess && successFilter &&
                <>
                    <header className="flex w-full flex-col justify-center items-center">
                        {
                            modalDeleteConfirmation &&
                            <DeleteConfirmation
                                closeModal={setModalDeleteConfirmation}
                                functionDelete={mutateDelete} />
                        }
                        {/* componente dinamico de geração de formulário para atualização ou criação de item */}
                        <ModalFormItem
                            fields={[
                                { label: "Nome", name: "name", type: "text", value: data?.collaborator.name, required: true },
                                {
                                    label: "Setor",
                                    name: "sectorId",
                                    type: "select",
                                    required: true,
                                    value: data?.collaborator.sector?.name ?? "Não definido",
                                    options: dataFilter.filters.sectors.map((sector) => (
                                        { value: sector.id, label: sector.name }
                                    ))
                                }
                            ]}
                            isOpen={isModalUpdate}
                            onClose={() => setModalUpdate(false)}
                            onSubmit={handleUpdateSubmit}
                            title='Atualização do colaborador' />
                        <BadgeIcon fontSize='large' className='size-20' />
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
                            <p>{data?.collaborator.sector?.name ?? "Não definido"}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-extrabold uppercase">Dispositivos</h1>
                            {
                                data.collaborator.Device.length ?
                                    data.collaborator.Device.map((device, index) =>
                                        <div key={index} className='flex gap-2 text-center size-fit rounded-md capitalize p-1 bg-buttom'>
                                            <p>{device.name}</p>
                                            <Link href={`/devices/${device.id}`}>
                                                <RemoveRedEyeIcon />
                                            </Link>
                                        </div>
                                    ) :
                                    <p>Sem Dispositivos Vinculados</p>
                            }
                        </div>
                    </section>
                </>
            }
        </div>
    )
}

export default CollaboratorIdDetails;