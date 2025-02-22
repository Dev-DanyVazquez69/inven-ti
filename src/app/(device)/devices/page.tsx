"use client"

import { Header } from "@/components/header/header"
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import { ItemsFiltersDevice, TypeFilterDevice } from "@/interfaces/filters";
import { useFilters } from "@/hooks/useFilters";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDevices } from "@/hooks/useDevice";
import LoadingRequest from "@/components/loadingApi";
import ErrorDisplay from "@/components/getErrorsMessage";

const initalFilters = {
    search: "",
    collaboratorId: "",
    manufacturerId: undefined,
    ownerId: undefined,
    sectorId: ""
}

const Devices: React.FC = () => {

    const [filters, setFilters] = useState<TypeFilterDevice>(initalFilters)
    const [modalFilter, setModalFilter] = useState<boolean>(false)
    
    const { data, isLoading, error, refetch } = useDevices(filters);
    const { data: dataFilter, isLoading: loadingFilter, error: errorFilter } = useFilters()


    const changeFilters = (key: ItemsFiltersDevice, value: string & number & undefined) => {
        const newFilter = { ...filters }
        newFilter[key] = value
        setFilters(newFilter)
    }
    const handleFilter = () => {
        setModalFilter(false)
        refetch()
    }
    const ResetFilters = () => {
        setFilters(initalFilters)
    }

    if (isLoading || loadingFilter) return <LoadingRequest />;

    return (
        <>
            <Header title="Dispositivos" />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <div className="flex w-full max-w-4xl flex-col">
                    <ErrorDisplay errors={[error, errorFilter]} />
                    <div className="py-10 text-center w-full font-extrabold">
                        <h1>Lista de Dispositivos</h1>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <Link
                            href={"/addDevice"}
                            className="flex gap-2">
                            <AddCircleOutlineIcon />
                            <p>Adicionar</p>
                        </Link>
                        {
                            data &&
                            <p>{`Total: ${data.devices.length}`}</p>
                        }
                        <button
                            onClick={() => setModalFilter(true)}
                            className="flex justify-end items-center gap-2 p-2 size-fit ">
                            <p>Filtrar</p>
                            <FilterListIcon />
                        </button>
                    </div>

                </div>
                <div className="flex w-full max-w-4xl flex-col bg-foreground rounded-xl items-end">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="font-bold bg-buttom rounded-xl h-10 border-white text-xs sm:text-base">
                                <th>Nome</th>
                                <th>Setor</th>
                                <th>Usuário</th>
                                <th>Tipo</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.devices.length !== 0 ?
                                    data?.devices.map((device, index) => {
                                        return (
                                            <tr key={index} className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                                <td className="">{device.name ?? "Não definido"}</td>
                                                <td className="">{device.Sector?.name ?? "Não definido"}</td>
                                                <td className="">{device.Collaborator?.name ?? "Não definido"}</td>
                                                <td className="">{device.TypeDevice?.name ?? "Não definido"}</td>
                                                <td>
                                                    <Link
                                                        href={`/devices/${device.id}`}>
                                                        <VisibilityIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                    :
                                    <tr className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                        <td className="">{"Não há dispositivos cadastrados"}</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {
                    modalFilter &&
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg h-2/3 md:h-3/4 w-3/4 max-w-2xl flex flex-col p-4 justify-around">
                            <h2 className="text-xl font-bold text-black text-center">Filtre o resultado</h2>
                            <div className="flex-1 flex flex-col text-black gap-3 p-2 justify-center">
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="search">Nome</label>
                                    {/* Usuário */}
                                    <input
                                        type="text"
                                        className="text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="search"
                                        id="search"
                                        value={filters.search}
                                        onChange={(e) => changeFilters('search', e.target.value as never)}>
                                    </input>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="usuario">Usuário</label>
                                    {/* Usuário */}
                                    <select
                                        className="text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="user"
                                        id="user"
                                        value={filters.collaboratorId}
                                        onChange={(e) => changeFilters('collaboratorId', e.target.value as never)}>
                                        <option value="">Não selecionado</option>
                                        {
                                            dataFilter?.filters.collaborators ?
                                                dataFilter.filters.collaborators.map((item, key) => (
                                                    <option key={key} value={item.id}>{item.name}</option>
                                                )) :
                                                <option value="">Sem opções</option>
                                        }
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
                                        id="manufacturer"
                                        value={filters.manufacturerId}
                                        onChange={(e) => changeFilters('manufacturerId', e.target.value as never)}>
                                        <option value="">Não selecionado</option>
                                        {
                                            dataFilter?.filters.manufactures ?
                                                dataFilter.filters.manufactures.map((item, key) => (
                                                    <option key={key} value={item.id}>{item.name}</option>
                                                )) :
                                                <option value="">Sem opções</option>
                                        }
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
                                        id="owner"
                                        value={filters.ownerId}
                                        onChange={(e) => changeFilters('ownerId', e.target.value as never)}>
                                        <option value="">Não selecionado</option>
                                        {
                                            dataFilter?.filters.owners ?
                                                dataFilter.filters.owners.map((item, key) => (
                                                    <option key={key} value={item.id}>{item.name}</option>
                                                )) :
                                                <option value="">Sem opções</option>
                                        }
                                    </select>
                                </div>
                                <div>
                                    {/* setor */}
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="sector">Setor</label>
                                    <select
                                        className="block w-full text-xs px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="sector"
                                        id="sector"
                                        value={filters.sectorId}
                                        onChange={(e) => changeFilters('sectorId', e.target.value as never)}>
                                        <option value="">Não selecionado</option>
                                        {
                                            dataFilter?.filters.sectors ?
                                                dataFilter.filters.sectors.map((item, key) => (
                                                    <option key={key} value={item.id}>{item.name}</option>
                                                )) :
                                                <option value="">Sem opções</option>
                                        }
                                    </select>
                                </div>
                                <div>
                                    {/* Tipo de dispositivo */}
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="typeDevice">Tipo de dispositivo</label>
                                    <select
                                        className="block text-xs w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="typeDevice"
                                        id="typeDevice"
                                        value={filters.typeDeviceId}
                                        onChange={(e) => changeFilters('typeDeviceId', e.target.value as never)}>
                                        <option value="">Não selecionado</option>
                                        {
                                            dataFilter?.filters.typeDevices ?
                                                dataFilter.filters.typeDevices.map((item, key) => (
                                                    <option key={key} value={item.id}>{item.name}</option>
                                                )) :
                                                <option value="">Sem opções</option>
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="flex w-full justify-around">
                                <button
                                    className="bg-buttom px-4 py-2 rounded-lg size-fit sm:w-40"
                                    onClick={handleFilter}>
                                    Filtrar
                                </button>
                                <button
                                    className="bg-buttom px-4 py-2 rounded-lg size-fit sm:w-40"
                                    onClick={() => ResetFilters()}>
                                    Limpar
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