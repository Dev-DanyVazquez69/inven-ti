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
        <div className="flex flex-1 flex-col w-full gap-5">
            {
                isSuccess &&
                <>
                    <header className="flex w-full flex-col justify-center items-center">
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
                            <button>
                                <EditIcon />
                            </button>
                            <button>
                                <DeleteForeverIcon />
                            </button>
                        </div>
                    </header>
                    <section className="flex flex-col w-full gap-5 p-5 bg-foreground rounded-lg">
                        <div className="">
                            <h1 className="font-extrabold uppercase">Setor</h1>
                            <p>{data?.device.Sector?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Colaborador</h1>
                            <p>{data?.device.Collaborator?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Marca</h1>
                            <p>{data?.device.Manufacturer?.name ?? ""}</p>
                        </div>
                        <div className="">
                            <h1 className="font-extrabold uppercase">Propiedade</h1>
                            <p>{data?.device.Owner?.name ?? ""}</p>
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