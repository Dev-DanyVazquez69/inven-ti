'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const LottieAnimation = dynamic(() => import("@/components/(lottieAnimation)/404/lottie"), {
    ssr: false,
});

const NotFound = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Garante que o código só execute no lado do cliente
    }, []);

    return (
        <div className="h-screen w-screen bg-primary flex items-center justify-center flex-col gap-5">
            <h1 className="text-4xl font-bold">Erro 404</h1>
            <p>Página Não encontrada</p>
            <div className="w-72 md:w-80 h-48 md:h-56 lg:h-60">
                {isClient && <LottieAnimation />} {/* Só renderiza no cliente */}
            </div>
            <Link
                className="bg-buttom p-2 rounded"
                href={'/'}>Retorne ao inicio</Link>
        </div>
    );
};

export default NotFound;
