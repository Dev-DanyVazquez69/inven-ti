import React from "react"
import { Header } from "@/components/header/header"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";
import { useDevices } from "@/hooks/device";

const Device = async ({
    params,
}: {
    params: Promise<{ deviceId: string }>
}) => {

    const deviceId = (await params).deviceId

    const { data, isLoading, error } = useDevices(undefined, deviceId)


    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Ocorreu um erro: {(error as Error).message}</p>;

    return (
        <>
            <Header title={deviceId} />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <div className="flex flex-1 flex-col w-full">
                    <header className="flex w-full flex-col justify-center items-center">
                        <p>{JSON.stringify(data)}</p>
                        <div className="relative w-24 h-24 rounded-full">
                            <Image
                                src={'/assets/avatar.png'}
                                alt="imagem device"
                                fill
                                className="object-fill bg-cover rounded-full"
                            />
                        </div>
                        <h1 className="font-black">Device</h1>
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
                            <p>{ }</p>
                        </div>
                        <div className="">
                            <h1>Colaborador</h1>
                            <p></p>
                        </div>
                        <div className="">
                            <h1>Marca</h1>
                            <p></p>
                        </div>
                        <div className="">
                            <h1>Propiedade</h1>
                            <p></p>
                        </div>
                        <div className="">
                            <h1>Numero de indentificação</h1>
                            <p></p>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Device;