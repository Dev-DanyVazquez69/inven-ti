import React from "react"
import { Header } from "@/components/header/header"
import CollaboratorIdDetails from "@/components/itemsDetails/collaboratordDetails"


const Collaborator = async ({
    params,
}: {
    params: Promise<{ collaboratorId: string }>
}) => {

    const collaboratorId = (await params).collaboratorId


    return (
        <>
            <Header title={"Colaboradores"} />
            <main className="flex flex-1 flex-col p-3 pt-10 items-center justify-start">
                <CollaboratorIdDetails CollaboratorId={collaboratorId} />
            </main>
        </>
    )
}

export default Collaborator;