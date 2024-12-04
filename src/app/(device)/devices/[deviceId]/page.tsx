import React from "react"
import { Header } from "@/components/header/header"
import DeviceIdDetails from "@/components/deviceIdDetails/devideIdDetails"


const Device = async ({
    params,
}: {
    params: Promise<{ deviceId: string }>
}) => {

    const deviceId = (await params).deviceId


    return (
        <>
            <Header title={"Dispositivo"} />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <DeviceIdDetails deviceId={deviceId} />
            </main>
        </>
    )
}

export default Device;