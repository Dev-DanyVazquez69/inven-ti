import { Header } from "@/components/header/header"
import Image from "next/image"
import Link from "next/link"

const Profile: React.FC = () => {
    return (
        <>
            <Header title="Perfil" />
            <main className="flex flex-col flex-1 items-center justify-center">
                <div className="flex-1 gap-5 flex flex-col justify-center items-center w-full">
                    <Image
                        alt="Avatar"
                        src={'/assets/avatar.png'}
                        width={120}
                        height={120}
                        className="rounded-full" />
                    <p>Daniel dos Santos</p>
                    <Link
                        href={"/signout"}
                        className="w-fit bg-buttom h-fit p-2 rounded hover:p-3">
                        <p>Logout</p>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center w-full">
                </div>
            </main>
        </>
    )
}

export default Profile