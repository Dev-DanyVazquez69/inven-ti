'use client'

import React, { useState } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from "next/image";
import Link from "next/link";
import { useUserSession } from "@/context/session-user-context";

interface HeaderProps {
    title: string,
}

export const Header: React.FC<HeaderProps> = ({ title }) => {

    const [modalMenu, setModalMenu] = useState<boolean>(false)
    const { user } = useUserSession()

    const handleModalMenu = () => {
        setModalMenu(!modalMenu)
    }

    return (
        <>
            <header className="px-5 pt-5 lg:h-22 xl:h-24 flex items-center justify-items-center bg-transparent">
                {/* Menu */}
                <div className="flex flex-1 lg:hidden">
                    <button onClick={handleModalMenu}>
                        <MenuIcon className="size-6 lg:size-10 text-white" />
                    </button>
                </div>
                {/* Link tela grande */}
                <div className="hidden lg:flex flex-1 items-center justify-center">
                    <ul className="flex text-white flex-row gap-5 font-md text-xl justify-between">
                        <li className="hover:animate-pulse">
                            <a href="/">Inicio</a>
                        </li>
                        <li className="hover:animate-pulse">
                            <a href="/devices">Dispositivos</a>
                        </li>
                        <li className="hover:animate-pulse">
                            <a href="/medicines">xxxxxx</a>
                        </li>
                        <li className="hover:animate-pulse">
                            <a href="/exams">xxxxxx</a>
                        </li>
                    </ul>
                </div>
                {/* titulo da página */}
                <div className="bg-transparent flex-1 text-center rounded-md max-w-sm lg:max-w-36 p-1 border border-white">
                    <h1 className="text-base text-white font-bold">{title}</h1>
                </div>
                {/* avatar perfil */}
                <div className="flex flex-1 justify-end">
                    <Link
                        href={'/profile'}
                        className="rounded-full h-10 w-10 bg-slate-600">
                        <Image
                            src={user?.user?.image ?? '/assets/avatar.png'}
                            alt={"Avatar"}
                            width={50}
                            height={50}
                            className="rounded-full bg-cover border border-black"
                        />
                    </Link>
                </div>
                {/* Menu aberto */}
                {
                    modalMenu &&
                    <div className="fixed size-full top-0 left-0 bg-black/50 z-50">
                        <div className="h-72 w-full bg-buttom flex p-5 rounded-b-3xl">
                            <section className="flex-1">

                            </section>
                            <section className="flex-1 flex items-start justify-center">
                                <ul className="flex flex-col gap-5 font-bold text-lg text-white">
                                    <li className="text-center hover:animate-pulse">
                                        <a href="/">Inicio</a>
                                    </li>
                                    <li className="text-center hover:animate-pulse">
                                        <a href="devices">Dispositivos</a>
                                    </li>
                                    <li className="text-center hover:animate-pulse">
                                        <a href="medicines">xxxxxx</a>
                                    </li>
                                    <li className="text-center hover:animate-pulse">
                                        <a href="exams">xxxxxx</a>
                                    </li>
                                </ul>
                            </section>
                            <section className="flex-1 flex-col flex justify-between items-end">
                                <button onClick={handleModalMenu}>
                                    <CloseIcon
                                        width={35}
                                        height={35}
                                    />
                                </button>

                                <Link
                                    href={"/signout"}
                                    className="w-fit bg-background h-fit p-2 rounded hover:p-3 animate-bounce">
                                    <p>Logout</p>
                                </Link>
                            </section>
                        </div>
                    </div>
                }
            </header>
        </>
    )
}