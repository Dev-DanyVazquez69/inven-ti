import Image from "next/image"
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "@/app/auth"
import Link from "next/link";
import SendIcon from '@mui/icons-material/Send';
import login from "./_actions/signin";

export default function Login() {

    return (
        <div className="w-screen h-screen flex gap-10 flex-col items-center justify-center bg-blue">
            <h1 className="text-4xl font-extrabold">Santos Petz</h1>
            <div className="flex flex-col gap-2 md:flex-row md:gap-5  items-center justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden flex gap-7 items-center justify-center">
                    <Image
                        src={'/web-app-manifest-512x512.png'}
                        alt="logo"
                        fill
                        className="object-cover" />
                </div>
                <div className="flex flex-col gap-5">
                    <form
                        className="flex flex-col gap-5 items-center"
                        action={login}
                    >
                        <label
                            htmlFor="email"
                            className="flex flex-col items-start justify-center">
                            Email
                            <input
                                className="text-foreground p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 border-b-2 border-white"
                                placeholder="Insira seu email"
                                name="email"
                                id="email"
                                type="email"
                                required />
                        </label>
                        <label
                            htmlFor="password"
                            className="flex flex-col items-start justify-center">
                            Password
                            <input
                                className="text-foreground p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 border-b-2 border-white"
                                placeholder="Insira sua senha"
                                name="password"
                                id="password"
                                type="password"
                                title="A senha deve ter pelo menos 8 caracteres, incluindo letras, números e um caractere especial (@, $, !, %, *, ?, &)"
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                required />
                        </label>
                        <div className="p-2 bg-foreground font-extrabold border-2 border-background rounded text-background flex gap-2 items-center justify-center text-sm">
                            <input
                                type="submit"
                                value="ENTRAR" />
                            <SendIcon />
                        </div>
                    </form>
                    <Link
                        className="self-center font-extralight text-xs"
                        href={"/register"}>
                        Ainda não possui conta?
                    </Link>
                    <form
                        action={async () => {
                            "use server"
                            await signIn("google")
                        }}
                    >
                        <div className="flex gap-2 bg-background p-2 rounded-full justify-center">
                            <GoogleIcon />
                            <button
                                className="text-xs"
                                type="submit">
                                Faça login com o Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}