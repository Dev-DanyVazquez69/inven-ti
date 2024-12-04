"use client"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import { useDevice } from "@/hooks/device";

interface DeviceIdProps {
    deviceId: string
}

const DeviceIdDetails: React.FC<DeviceIdProps> = ({ deviceId }) => {

    const { data, isLoading, error, isSuccess } = useDevice(deviceId)

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Ocorreu um erro: {(error as Error).message}</p>;

    return (
        <div className="flex flex-1 flex-col w-full">
            {
                isSuccess &&
                <>
                    <header className="flex w-full flex-col justify-center items-center">
                        <div className="relative w-24 h-24 rounded-full">
                            <Image
                                src={'/assets/notebook-asus.png'}
                                alt="imagem device"
                                fill
                                className="object-fill bg-cover rounded-full"
                            />
                        </div>
                        <h1 className="font-black">{data?.device.name}</h1>
                        <div className="flex w-full justify-end gap-3">
                            <button>
                                <EditIcon />
                            </button>
                            <button>
                                <DeleteForeverIcon />
                            </button>
                        </div>
                    </header>
                    <section className="flex flex-col flex-1 w-full justify-between p-5">
                        <div className="">
                            <h1>Setor</h1>
                            <p>{data?.device.Sector?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1>Colaborador</h1>
                            <p>{data?.device.Collaborator?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1>Marca</h1>
                            <p>{data?.device.Manufacturer?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1>Propiedade</h1>
                            <p>{data?.device.Owner?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1>Numero de indentificação</h1>
                            <p>{data?.device.registerNumber}</p>
                        </div>
                    </section>
                </>
            }
        </div>
    )
}

export default DeviceIdDetails;