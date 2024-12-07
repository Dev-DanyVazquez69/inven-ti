"use client"

import { Header } from "@/components/header/header";
import { useFilters } from "@/hooks/filters";
import Image from "next/image";
import { useCreateDevice } from "@/hooks/device";
import { useState } from "react";
import { devicePostBody, ItemsDevicePostBody } from "@/interfaces/devices";

const AddDevice: React.FC = () => {

    const [formData, setFormData] = useState<devicePostBody>({
        name: "",
        description: null,
        sectorId: "",
        collaboratorId: "",
        image: null,
        registerNumber: undefined,
        manufacturerId: undefined,
        ownerId: undefined,
        typeDeviceId: 0
    })

    const { error, isLoading, data } = useFilters()
    const { mutate, error: errorDevicePost, isSuccess} = useCreateDevice(formData)

    const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate()
    }

    const changeDataForm = (key: ItemsDevicePostBody, value: string & number & undefined) => {
        const newFormData = { ...formData }
        newFormData[key] = value
        setFormData(newFormData)
    }

    if (isLoading) return <p>Carregando...</p>;
    if (error) return <p>Ocorreu um erro: {(error as Error).message}</p>;

    return (
        <>
            <Header title={"Adicionar"} />
            <main className="flex flex-1 flex-col p-3 pt-10 items-center justify-start">
                <div className="flex flex-1 flex-col w-full gap-5 items-center">
                    <header className="flex w-full flex-col justify-center items-center">
                        <div className="relative w-24 h-20 rounded-full">
                            <Image
                                src={'/assets/notebook-asus.png'}
                                alt="imagem device"
                                fill
                                className="object-fill bg-cover"
                            />
                        </div>
                        <h1 className="font-black">{"Adicionar Dispositivo"}</h1>
                    </header>
                    <section className="flex flex-col w-full gap-5 p-5 bg-foreground rounded-lg max-w-4xl">
                        <p>{errorDevicePost && JSON.stringify(errorDevicePost)}</p>
                        <p>{isSuccess && "Cadastrado com sucesso"}</p>
                        <form
                            onSubmit={handleCreatePost}
                            className="flex flex-col gap-4">
                            {/* Nome */}
                            <label
                                className="font-extrabold"
                                htmlFor="name">Nome*</label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => changeDataForm('name', e.target.value as never)}
                                placeholder="Insira o nome do dispositivo"
                                className="w-full max-w-4xl py-1 border-b border-white shadow-sm focus:outline-none bg-transparent" />
                            {/* Descrição */}
                            <label
                                className="font-bold"
                                htmlFor="description">Descrição</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description as string}
                                onChange={(e) => changeDataForm('description', e.target.value as never)}
                                placeholder="Insira a descrição do dispositivo"
                                className="w-full max-w-4xl py-1 border-b border-white shadow-sm focus:outline-none bg-transparent" />
                            {/*Colaborador*/}
                            <label
                                className="font-extrabold"
                                htmlFor="collaboratorId">Colaborador</label>
                            <select
                                className="bg-transparent w-full py-1 border-b border-white shadow-sm focus:outline-none focus:ring-2 focus:bg-black focus:text-white"
                                name="collaboratorId"
                                value={formData.collaboratorId as string}
                                onChange={(e) => changeDataForm('collaboratorId', e.target.value as never)}
                                id="collaboratorId">
                                <option value="">Não selecionado</option>
                                {
                                    data?.filters.collaborators ?
                                        data.filters.collaborators.map((item, key) => (
                                            <option key={key} value={item.id}>{item.name}</option>
                                        )) :
                                        <option value="">Sem opções</option>
                                }
                            </select>
                            {/*Setor*/}
                            <label
                                className="font-extrabold"
                                htmlFor="sectorId">Setor</label>
                            <select
                                className="bg-transparent w-full py-1 border-b border-white shadow-sm focus:outline-none focus:ring-2 focus:bg-black focus:text-white"
                                name="sectorId"
                                value={formData.sectorId as string}
                                onChange={(e) => changeDataForm('sectorId', e.target.value as never)}
                                id="sectorId">
                                <option value="">Não selecionado</option>
                                {
                                    data?.filters.sectors ?
                                        data.filters.sectors.map((item, key) => (
                                            <option key={key} value={item.id}>{item.name}</option>
                                        )) :
                                        <option value="">Sem opções</option>
                                }
                            </select>
                            {/* Fabricante */}
                            <label
                                className="font-extrabold"
                                htmlFor=" manufacturerId">Fabricante</label>
                            <select
                                className="bg-transparent w-full py-1 border-b border-white shadow-sm focus:outline-none focus:ring-2 focus:bg-black focus:text-white"
                                name="manufacturerId"
                                value={formData.manufacturerId as number}
                                onChange={(e) => changeDataForm('manufacturerId', e.target.value as never)}
                                id="manufacturerId">
                                <option value="">Não selecionado</option>
                                {
                                    data?.filters.manufactures ?
                                        data.filters.manufactures.map((item, key) => (
                                            <option key={key} value={item.id}>{item.name}</option>
                                        )) :
                                        <option value="">Sem opções</option>
                                }
                            </select>
                            {/* Propiedade*/}
                            <label
                                className="font-extrabold"
                                htmlFor="owner">Propiedade</label>
                            <select
                                className="bg-transparent w-full py-1 border-b border-white shadow-sm focus:outline-none focus:ring-2 focus:bg-black focus:text-white"
                                name="ownerId"
                                value={formData.ownerId as number}
                                onChange={(e) => changeDataForm('ownerId', e.target.value as never)}
                                id="ownerId">
                                <option value="">Não selecionado</option>
                                {
                                    data?.filters.owners ?
                                        data.filters.owners.map((item, key) => (
                                            <option key={key} value={item.id}>{item.name}</option>
                                        )) :
                                        <option value="">Sem opções</option>
                                }
                            </select>
                            {/*Tipo de dispositivo*/}
                            <label
                                className="font-extrabold"
                                htmlFor="typeDeviceId">Tipo de dispositivo</label>
                            <select
                                className="bg-transparent w-full py-1 border-b border-white shadow-sm focus:outline-none focus:ring-2 focus:bg-black focus:text-white"
                                name="typeDeviceId"
                                value={formData.typeDeviceId as number}
                                onChange={(e) => changeDataForm('typeDeviceId', e.target.value as never)}
                                id="typeDeviceId">
                                <option value="">Não selecionado</option>
                                {
                                    data?.filters.typeDevices ?
                                        data.filters.typeDevices.map((item, key) => (
                                            <option key={key} value={item.id}>{item.name}</option>
                                        )) :
                                        <option value="">Sem opções</option>
                                }
                            </select>
                            {/* Numero de indetificação */}
                            <label
                                className="font-bold"
                                htmlFor="registerNumber">Numero de Indetificação</label>
                            <input
                                type="text"
                                id="registerNumber"
                                name="registerNumber"
                                placeholder="Insira o numero de indetificação"
                                value={formData.registerNumber as number}
                                onChange={(e) => changeDataForm('registerNumber', e.target.value as never)}
                                className="w-full max-w-4xl py-1 border-b border-white shadow-sm focus:outline-none bg-transparent" />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-background size-fit self-center border border-white rounded-lg">
                                Cadastrar
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    )
}

export default AddDevice;