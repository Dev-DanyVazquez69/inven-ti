"use client"

import { Header } from "@/components/header/header"
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";

const Devices: React.FC = () => {

    const [modalFilter, setModalFilter] = useState<boolean>(false)

    return (
        <>
            <Header title="Dispositivos" />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <div className="py-10 text-center w-full font-extrabold">
                    <h1>Lista de Dispositivos</h1>
                </div>
                <button
                    onClick={() => setModalFilter(true)}
                    className="flex justify-end items-center gap-2 p-2 text-xl size-fit self-end">
                    <p>Filtrar</p>
                    <FilterListIcon />
                </button>
                <div className="flex w-full max-w-4xl flex-col bg-foreground rounded-xl items-end">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-bold bg-buttom rounded-xl h-10 border-white">
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Setor</th>
                                <th>Usuário</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden">
                                <td className="">25</td>
                                <td className="">Desktop HP</td>
                                <td className="">Cobep</td>
                                <td className="">Anderson</td>
                                <td>
                                    <Link
                                    href={"/device/454544"}>
                                        <VisibilityIcon />
                                    </Link>
                                </td>
                            </tr>
                            <tr className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden">
                                <td className="">25</td>
                                <td className="">Desktop HP</td>
                                <td className="">Cobep</td>
                                <td className="">Anderson</td>
                                <td>
                                    <Link
                                    href={"/device/454544"}>
                                        <VisibilityIcon />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                {
                    modalFilter &&
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg h-1/2 md:h-3/5 w-3/4 max-w-2xl flex flex-col p-4 justify-around">
                            <h2 className="text-xl font-bold text-black text-center">Filtre o resultado</h2>
                            <div className="flex-1 flex flex-col text-black gap-3 p-2 justify-center">
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="usuario">Usuário</label>
                                    {/* Usuário */}
                                    <select
                                        className="text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="user"
                                        id="user">
                                        <option value="">Não selecionado</option>
                                        <option value="Daniel">Daniel</option>
                                        <option value="Daniel">Anderson</option>
                                    </select>
                                </div>
                                <div>
                                    {/* Marca */}
                                    <label
                                        className="text-background font-bold"
                                        htmlFor=" manufacturer">Fabricante</label>
                                    <select
                                        className="text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="manufacturer"
                                        id="manufacturer">
                                        <option value="">Não selecionado</option>
                                        <option value="Daniel">HP</option>
                                        <option value="Daniel">C3tech</option>
                                    </select>
                                </div>
                                <div>
                                    {/* Propiedade */}
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="owner">Propiedade</label>
                                    <select
                                        className="block text-xs w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="owner"
                                        id="owner">
                                        <option value="">Não selecionado</option>
                                        <option value="Daniel">Ipam</option>
                                        <option value="Daniel">Alucom</option>
                                    </select>
                                </div>
                                <div>
                                    {/* Fabricante */}
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="sector">Setor</label>
                                    <select
                                        className="block w-full text-xs px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="sector"
                                        id="sector">
                                        <option value="">Não selecionado</option>
                                        <option value="Daniel">cobep</option>
                                        <option value="Daniel">supre</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex w-full justify-around">
                                <button
                                    disabled
                                    className="bg-buttom px-4 py-2 rounded-lg size-fit sm:w-40"
                                    onClick={() => { }}>
                                    Filtrar
                                </button>
                                <button
                                    className="bg-buttom px-4 py-2 rounded-lg size-fit sm:w-40"
                                    onClick={() => setModalFilter(false)}>
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </main>
        </>
    )
}

export default Devices;