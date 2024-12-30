import Image from "next/image"
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "@/app/auth"
import LoginForm from "@/components/LoginForm/LoginForm";
// import Link from "next/link";

export default function Login() {


    return (
        <div className="w-screen h-screen flex gap-10 flex-col items-center justify-center bg-blue">
            <h1 className="text-4xl font-extrabold">InvenTi</h1>
            <div className="flex flex-col gap-2 md:flex-row md:gap-5  items-center justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden flex gap-7 items-center justify-center">
                    <Image
                        src={'/web-app-manifest-512x512.png'}
                        alt="logo"
                        fill
                        className="object-cover" />
                </div>
                <div className="flex flex-col gap-5">
                    <LoginForm />
                    {/* <Link
                        className="self-center font-extralight text-xs"
                        href={"/register"}>
                        Ainda não possui conta?
                    </Link> */}
                    <form
                        className="flex items-center justify-center"
                        action={async () => {
                            "use server"
                            await signIn("google")
                        }}
                    >
                        <div className="flex gap-2 bg-buttom p-2 rounded-full justify-center w-fit">
                            <GoogleIcon />
                            <button
                                className="text-xs cursor-no-drop"
                                type="submit">
                                Login com o Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}