"use client"

import { Header } from "@/components/header/header"
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from "next/link";
import { ItemsFiltersCollaborator, TypeFilterCollaborator } from "@/interfaces/filters";
import { useFilters } from "@/hooks/useFilters";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useCollaborators, useCreateCollaborator, useDeleteCollaborator } from "@/hooks/useCollaborator";
import { bodyPostCollaborator, ItemsCollaboratorPostBody } from "@/interfaces/collaborator";
import SuccessModal from "@/components/modal/successApi";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteConfirmation from "@/components/modal/deletionConfirmation";
import ErrorDisplay from "../../components/getErrorsMessage";
import LoadingRequest from "@/components/loadingApi";

const Collaborators: React.FC = () => {

    const initalFilters = {
        search: "",
        sectorId: ""
    }

    const formDataInit = {
        name: "",
        sectorId: "",
        imageProfile: null
    }

    const [formData, setFormData] = useState<bodyPostCollaborator>(formDataInit)
    const [filters, setFilters] = useState<TypeFilterCollaborator>(initalFilters)
    const [modalFilter, setModalFilter] = useState<boolean>(false)
    const [modalCreateCollaborator, setModalCreateCollaborator] = useState<boolean>(false)
    const [collaboratorDelete, setCollaboratorDelete] = useState<string>("")
    const [modalDeleteConfirmation, setModalDeleteConfirmation] = useState<boolean>(false)

    const { mutate, error: errorDevicePost, isSuccess, reset } = useCreateCollaborator(formData)
    const { data, isLoading, error, refetch } = useCollaborators(filters);
    const { data: dataFilter, isLoading: loadingFilter, error: errorFilter } = useFilters()
    const { error: errorDelete, mutate: mutateDelete } = useDeleteCollaborator(collaboratorDelete)


    const changeFilters = (key: ItemsFiltersCollaborator, value: string & number & undefined) => {
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

    const handleCreatePost = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setModalCreateCollaborator(false)
        mutate()
    }

    const changeDataForm = (key: ItemsCollaboratorPostBody, value: string & number & undefined) => {
        const newFormData = { ...formData }
        newFormData[key] = value
        setFormData(newFormData)
    }

    const closeModalStatus = () => {
        setFormData(formDataInit)
        reset()
    }

    const deleteCollaborator = (idDelete: string) => {
        setCollaboratorDelete(idDelete)
        setModalDeleteConfirmation(true)
    }

    if (isLoading || loadingFilter) return <LoadingRequest />;

    return (
        <>
            <Header title="Colaboradores" />
            <main className="flex flex-1 flex-col p-3 items-center justify-start">
                <div className="flex w-full max-w-4xl flex-col">
                    <ErrorDisplay errors={[error, errorFilter, errorDelete, errorDevicePost]} />
                    {isSuccess && (
                        <SuccessModal
                            message="A operação foi concluída com sucesso!"
                            onFinally={() => closeModalStatus()}
                        />
                    )}
                    {
                        modalDeleteConfirmation &&
                        <DeleteConfirmation closeModal={setModalDeleteConfirmation} functionDelete={mutateDelete} />
                    }
                    <div className="py-10 text-center w-full font-extrabold">
                        <h1>Lista de Colaboradores</h1>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <button
                            onClick={() => setModalCreateCollaborator(true)}
                            className="flex gap-2">
                            <AddCircleOutlineIcon />
                            <p>Adicionar</p>
                        </button>
                        {
                            data &&
                            <p>{`Total: ${data.collaborators.length}`}</p>
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
                                <th></th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.collaborators.length !== 0 ?
                                    data?.collaborators.map((collaborator, index) => {
                                        return (
                                            <tr key={index} className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                                <td className="">{collaborator?.name ?? "Não definido"}</td>
                                                <td className="">{collaborator.sector?.name ?? "Não definido"}</td>
                                                <td></td>
                                                <td className="">
                                                    <button onClick={() => deleteCollaborator(collaborator.id)}>
                                                        <DeleteForeverIcon />
                                                    </button>
                                                    <Link
                                                        href={`/collaborators/${collaborator.id}`}>
                                                        <VisibilityIcon />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                    :
                                    <tr className="text-center border-b border-white h-20 hover:bg-buttom/10 rounded-xl overflow-hidden  text-xs sm:text-base">
                                        <td className="">{"Não há colaboradores cadastrados"}</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {
                    modalFilter &&
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white rounded-lg shadow-lg h-1/3 w-3/4 max-w-2xl flex flex-col p-4 justify-around">
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
                {
                    modalCreateCollaborator &&
                    <div className="fixed inset-0 flex items-center justify-center">
                        <form onSubmit={handleCreatePost} className="bg-white rounded-lg shadow-lg h-1/3 w-3/4 max-w-2xl flex flex-col p-4 justify-around">
                            <h2 className="text-xl font-bold text-black text-center">Criar novo Colaborador</h2>
                            <div className="flex-1 flex flex-col text-black gap-3 p-2 justify-center">
                                {/* Nome */}
                                <div className="flex flex-col gap-2">
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="name">Nome</label>
                                    <input
                                        type="text"
                                        className="text-xs block w-full px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="name"
                                        id="name"
                                        required
                                        minLength={3}
                                        value={formData.name}
                                        onChange={(e) => changeDataForm('name', e.target.value as never)}>
                                    </input>
                                </div>
                                {/* setor */}
                                <div>
                                    <label
                                        className="text-background font-bold"
                                        htmlFor="sectorId">Setor</label>
                                    <select
                                        className="block w-full text-xs px-4 py-1 border border-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-buttom focus:text-white"
                                        name="sectorId"
                                        id="sectorId"
                                        required
                                        value={formData.sectorId}
                                        onChange={(e) => changeDataForm('sectorId', e.target.value as never)}>
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
                            </div>
                            <div className="flex w-full justify-around">
                                <button
                                    className="bg-buttom px-4 py-2 rounded-lg size-fit sm:w-40"
                                    type="submit">
                                    Cadastrar
                                </button>
                                <button
                                    className="bg-buttom px-4 py-2 rounded-lg size-fit sm:w-40"
                                    onClick={() => setModalCreateCollaborator(false)}>
                                    Fechar
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </main>
        </>
    )
}

export default Collaborators;