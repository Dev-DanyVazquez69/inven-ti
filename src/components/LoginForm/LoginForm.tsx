'use client'

import login from "@/app/(auth)/signin/_actions/signin";
import SendIcon from '@mui/icons-material/Send';
import { useFormState } from "react-dom";

const LoginForm = () => {

    const [state, formAction, isPending] = useFormState(login, null)

    return (
        <>
            {
                state &&
                <p className="text-xs text-red-500 text-center w-2/3 font-thin">{state.message}</p>
            }

            <form
                className="flex flex-col gap-5 items-center"
                action={formAction}
            >
                <label
                    htmlFor="email"
                    className="flex flex-col items-start justify-center">
                    Email
                    <input
                        className="p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 border-b-2 border-white"
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
                        className="p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-green-400 border-b-2 border-white"
                        placeholder="Insira sua senha"
                        name="password"
                        id="password"
                        type="password"
                        title="A senha deve ter pelo menos 8 caracteres, incluindo letras, números e um caractere especial (@, $, !, %, *, ?, &)"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        required />
                </label>
                <div className="p-2 bg-buttom font-extrabold border-2 border-background rounded-xl text-background flex gap-2 items-center justify-center text-sm text-white">
                    <input
                        disabled={isPending}
                        type="submit"
                        value="ENTRAR" />
                    <SendIcon />
                </div>
                <p className="text-xs text-yellow-400 text-center w-2/3 font-thin">Após login com o google, entre em contato com o suporte</p>
            </form>
        </>
    )
}

export default LoginForm;