"use client"

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useCollaborator } from "@/hooks/collaborator";
import FaceIcon from '@mui/icons-material/Face';

interface CollaboratorProps {
    CollaboratorId: string
}

const CollaboratorIdDetails: React.FC<CollaboratorProps> = ({ CollaboratorId }) => {

    const { data, isLoading, error, isSuccess } = useCollaborator(CollaboratorId)

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Ocorreu um erro: {(error as Error).message}</p>;

    return (
        <div className="flex flex-1 flex-col w-full gap-5">
            {
                isSuccess &&
                <>
                    <header className="flex w-full flex-col justify-center items-center">
                        <div className="relative w-24 h-24 rounded-full">
                            <FaceIcon height={50} width={50} />
                        </div>
                        <h1 className="font-black">{data?.collaborator.name}</h1>
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