"use client"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import { useDeleteDevice, useDevice, useUpdateDevice } from "@/hooks/device";
import LoadingRequest from '../loadingApi';
import ErrorDisplay from '../getErrorsMessage';
import { useEffect, useState } from 'react';
import { bodyDeviceUpdate } from '@/interfaces/devices';
import ModalFormItem from '../modal/formItem';
import { useFilters } from '@/hooks/filters';
import { redirect } from 'next/navigation';
import DeleteConfirmation from '../modal/deletionConfirmation';

interface DeviceIdProps {
    deviceId: string
}

const dataUpdateDeviceInit = {
    name: "",
    description: "",
    sectorId: "",
    collaboratorId: "",
    image: "",
    registerNumber: 0,
    manufacturerId: 0,
    ownerId: 0,
    typeDeviceId: 0
}

const DeviceIdDetails: React.FC<DeviceIdProps> = ({ deviceId }) => {

    const [dataUpdateDevice, setDataUpdateDevice] = useState<bodyDeviceUpdate>(dataUpdateDeviceInit)
    const [modalUpdate, setModalUpdate] = useState<boolean>(false)
    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState<boolean>(false)

    const { data, isLoading, error, isSuccess } = useDevice(deviceId)
    const { data: dataFilter, error: errorFIlter, isLoading: loadingFilter } = useFilters()
    const { error: errorDelete, mutate: mutateDelete, isSuccess: successDelete } = useDeleteDevice(deviceId)
    const { error: errorUpdate, mutate: mutateUpdate } = useUpdateDevice(dataUpdateDevice, deviceId)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpdateSubmit = (data: Record<string, any>) => {
        console.log('Dados enviados para atualização:', data);
        const updatedData: bodyDeviceUpdate = {
            name: data.name,
            description: data.description,
            sectorId: data.sectorId,
            collaboratorId: data.collaboratorId,
            image: null,
            registerNumber: data.registerNumber,
            manufacturerId: data.manufacturerId,
            ownerId: data.ownerId,
            typeDeviceId: data.typeDeviceId
        };
        setDataUpdateDevice(updatedData)
        setModalUpdate(false);
        mutateUpdate()
    };

    //use effect para enviar o usuário a tela de todos os colaboradores após a exclusão
    useEffect(() => {
        if (successDelete) {
            redirect("/devices");
        }
    }, [successDelete]);



    if (isLoading || loadingFilter) return <LoadingRequest />;

    return (
        <div className="flex flex-1 flex-col w-full gap-5">
            {
                isSuccess &&
                <>
                    <header className="flex w-full flex-col justify-center items-center">
                        {
                            modalDeleteConfirmation &&
                            <DeleteConfirmation
                                closeModal={setModalDeleteConfirmation}
                                functionDelete={mutateDelete} />
                        }
                        <ErrorDisplay errors={[error, errorDelete, errorUpdate, errorFIlter]} />
                        <ModalFormItem
                            title='Atualização do Dispositivo'
                            isOpen={modalUpdate}
                            onClose={() => setModalUpdate(false)}
                            onSubmit={handleUpdateSubmit}
                            fields={[
                                {
                                    label: "Nome", name: "name", type: "text", value: data?.device.name, required: true
                                },
                                {
                                    label: "Descrição", name: "description", type: "text", value: data?.device.description, required: true
                                },
                                {
                                    label: "Setor", name: "sectorId", type: "select", required: true, value: data?.device.Sector.name,
                                    options: dataFilter?.filters.sectors.map((sector) => (
                                        { value: sector.id, label: sector.name }
                                    ))
                                },
                                {
                                    label: "Colaborador", name: "collaboratorId", type: "select", required: true, value: data?.device.Collaborator?.name ?? "Sem usuário",
                                    options: dataFilter?.filters.collaborators.map((collaborator) => (
                                        { value: collaborator.id, label: collaborator.name }
                                    ))
                                },
                                {
                                    label: "Tipo de dispositivo", name: "typeDeviceId", type: "select", required: true, value: data?.device.TypeDevice.name,
                                    options: dataFilter?.filters.typeDevices.map((typeDevice) => (
                                        { value: typeDevice.id, label: typeDevice.name }
                                    ))
                                },
                                {
                                    label: "Propietário", name: "ownerId", type: "select", required: true, value: data?.device.Owner?.name ?? "Sem usuário",
                                    options: dataFilter?.filters.owners.map((owners) => (
                                        { value: owners.id, label: owners.name }
                                    ))
                                },
                                {
                                    label: "Marca", name: "manufacturerId", type: "select", required: true, value: data?.device.Manufacturer?.name ?? "Sem usuário",
                                    options: dataFilter?.filters.manufactures.map((manufacturer) => (
                                        { value: manufacturer.id, label: manufacturer.name }
                                    ))
                                },
                                {
                                    label: "Numero de Registro", name: "registerNumber", type: "text", value: data?.device.registerNumber, required: true
                                },
                            ]} />
                        <div className="relative w-24 h-24 rounded-full">
                            <Image
                                src={'/assets/notebook-asus.png'}
                                alt="imagem device"
                                fill
                                className="object-fill bg-cover"
                            />
                        </div>
                        <h1 className="font-black">{data?.device.name}</h1>
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
                            <p>{data?.device.Sector?.name ?? "Não definido"}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Colaborador</h1>
                            <p>{data?.device.Collaborator?.name ?? "Não definido"}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Marca</h1>
                            <p>{data?.device.Manufacturer?.name ?? "Não definido"}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Propiedade</h1>
                            <p>{data?.device.Owner?.name ?? "Não definido"}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Numero de indentificação</h1>
                            <p>{data?.device.registerNumber}</p>
                        </div>
                    </section>
                </>
            }
        </div>
    )
}

export default DeviceIdDetails;