import React from "react"
import { Header } from "@/components/header/header"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";

const Device = async ({
    params,
}: {
    params: Promise<{ deviceId: string }>
}) => {

    const deviceId = (await params).deviceId

    return (
        <>
            <Header title={deviceId} />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <header className="w-full h-14 flex justify-end items-center gap-3 px-5">
                    <EditIcon />
                    <DeleteForeverIcon />
                </header>
                <div className="bg-green-400 flex flex-1 w-full">
                    <section className="flex justify-center">
                        <Image
                            src={'/assets/avatar.png'}
                            alt="imagem device"
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                        <h1>
                            Device
                        </h1>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Device;