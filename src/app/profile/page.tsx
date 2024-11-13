import { Header } from "@/components/header/header"
import Image from "next/image"

const Profile: React.FC = () => {
    return (
        <>
            <Header title="Perfil" />
            <main className="flex flex-col flex-1 items-center justify-center">
                <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <Image
                        alt="Avatar"
                        src={'/assets/avatar.png'}
                        width={120}
                        height={120}
                        className="rounded-full" />
                    <p>Daniel dos Santos</p>
                </div>
                <div className="flex flex-1 items-center justify-center w-full">
                </div>
            </main>
        </>
    )
}

export default Profile