import { Header } from "@/components/header/header";
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import MouseIcon from '@mui/icons-material/Mouse';
import BusinessIcon from '@mui/icons-material/Business';
import Link from "next/link";

export default async function Home() {

  return (
    <>
      <Header
        title="Inicio" />
      <main className="flex flex-1 flex-col gap-10 items-center justify-center p-6">
        <section className="bg-foreground w-full max-w-4xl flex-1 rounded-xl flex flex-col justify-between p-3">
          <h1 className="font-extrabold">Dispositivos</h1>
          <div className="flex justify-around items-center">
            <ul className="text-center flex w-full justify-around">
              <li>
                <DesktopMacIcon />
                <h5>Desktops</h5>
                <p>25</p>

              </li>
              <li>
                <LaptopChromebookIcon />
                <h5>Notebooks</h5>
                <p>25</p>

              </li>
              <li>
                <MouseIcon />
                <h5>Mouse</h5>
                <p>25</p>

              </li>
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
          <h1 className="font-extrabold">Usuários</h1>
          <div className="flex justify-around items-center">
            <ul className="text-center flex w-full justify-around">
              <li>
                <BusinessIcon />
                <h5>Cobep</h5>
                <p>8</p>

              </li>
              <li>
                <BusinessIcon />
                <h5>Supre</h5>
                <p>5</p>

              </li>
              <li>
                <BusinessIcon />
                <h5>Gabinete</h5>
                <p>7</p>

              </li>
            </ul>
          </div>
          <div className="flex items-end justify-end">
            <button className="p-1 bg-buttom text-xs rounded-sm">Ver mais</button>
          </div>
        </section>
        <section className="bg-foreground w-full max-w-4xl flex-1 rounded-xl flex flex-col justify-between p-3">
          <h1 className="font-extrabold">Gerenciar</h1>
            <ul className="flex-col w-full flex-wrap px-5">
              <li className="flex justify-between items-center gap-5 p-1">
                <h5>Setores</h5>
                <button className="p-1 bg-buttom rounded-md">Gerenciar</button>
              </li>
              <li className="flex justify-between items-center gap-5 p-1">
                <h5>Propiedades</h5>
                <button className="p-1 bg-buttom rounded-md">Gerenciar</button>
              </li>
              <li className="flex justify-between items-center gap-5 p-1">
                <h5>Fabricantes</h5>
                <button className="p-1 bg-buttom rounded-md">Gerenciar</button>
              </li>
              <li className="flex justify-between items-center gap-5 p-1">
                <h5>Tipos de dispositivos</h5>
                <button className="p-1 bg-buttom rounded-md">Gerenciar</button>
              </li>
            </ul>
        </section>
      </main>
    </>
  );
}