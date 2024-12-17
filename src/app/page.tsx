"use client"

import { Header } from "@/components/header/header";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import BusinessIcon from '@mui/icons-material/Business';
import Link from "next/link";
import { useFetchcountItems } from "@/hooks/useCountItems";
import ErrorDisplay from "@/components/getErrorsMessage";
import LoadingRequest from "@/components/loadingApi";

export default function Home() {

  const { data, error, isLoading } = useFetchcountItems()

  if (isLoading) return <LoadingRequest />
  return (
    <>
      <Header
        title="Inicio" />
      <main className="flex flex-1 flex-col gap-10 items-center justify-center p-6">
        <ErrorDisplay errors={[error]} />
        <section className="bg-foreground w-full max-w-4xl flex-1 rounded-xl flex flex-col justify-between p-3">
          <h1 className="font-extrabold">Dispositivos</h1>
          <div className="flex justify-around items-center">
            <ul className="text-center flex w-full flex-wrap gap-2 justify-around">
              {
                data?.countItems.countDeviceInTypes.length !== 0 ?
                  data?.countItems.countDeviceInTypes.map((typeDevice, index) =>
                    <li key={index}>
                      <DesktopMacIcon />
                      <h5 className="capitalize">{typeDevice.typeName}</h5>
                      <p className="capitalize">{typeDevice.count}</p>
                    </li>
                  ) :
                  <li>
                    <DesktopMacIcon />
                    <h5>Ainda não há dispositivos registrados</h5>
                  </li>
              }
            </ul>
          </div>
          <div className="flex items-end justify-end">
            <Link
              className="p-1 bg-buttom text-xs rounded-sm"
              href={"/devices"}>
              Ver mais
            </Link>
          </div>
        </section>
        <section className="bg-foreground w-full max-w-4xl flex-1 rounded-xl flex flex-col justify-between p-3">
          <h1 className="font-extrabold">Colaboradores</h1>
          <div className="flex justify-around items-center">
            <ul className="text-center flex w-full justify-around">
              {
                data?.countItems.countCollaboratorsInSectors.length !== 0 ?
                  data?.countItems.countCollaboratorsInSectors.map((type, index) =>
                    <li key={index}>
                      <BusinessIcon />
                      <h5 className="capitalize">{type.typeName}</h5>
                      <p className="capitalize">{type.count}</p>
                    </li>
                  ) :
                  <li>
                    <DesktopMacIcon />
                    <h5>Ainda não há setores registrados</h5>
                  </li>
              }
            </ul>
          </div>
          <div className="flex items-end justify-end">
            <Link href={"/collaborators"} className="p-1 bg-buttom text-xs rounded-sm">Ver mais</Link>
          </div>
        </section>

        <section className="bg-foreground w-full max-w-4xl flex-1 rounded-xl flex flex-col justify-around p-2">
          <h1 className="font-extrabold">Gerenciar</h1>
          <ul className="flex-col w-full px-5">
            <li className="flex justify-between gap-5 my-2 items-center">
              <h5>Setores</h5>
              <Link href={"/sectors"} className="bg-buttom px-2 py-1 rounded-lg">Gerenciar</Link>
            </li>
            <li className="flex justify-between gap-5 my-2 items-center">
              <h5>Fabricantes</h5>
              <Link href={"/manufacturers"} className="bg-buttom px-2 py-1 rounded-lg">Gerenciar</Link>
            </li>
            <li className="flex justify-between gap-5 my-2 items-center">
              <h5>Propietários</h5>
              <Link href={"/owners"} className="bg-buttom px-2 py-1 rounded-lg">Gerenciar</Link>
            </li>
            <li className="flex justify-between gap-5 my-2 items-center">
              <h5>Tipo de Dispositivo</h5>
              <Link href={"/typesDevice"} className="bg-buttom px-2 py-1 rounded-lg">Gerenciar</Link>
            </li>
          </ul>

        </section>
      </main>
    </>
  );
}