'use client'

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";


interface ErrorRequestProps {
    error: Error
}

const LottieAnimation = dynamic(() => import("@/components/(lottieAnimation)/404/lottie"), {
    ssr: false,
});

const ErrorRequest: React.FC<ErrorRequestProps> = ({ error }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Garante que o código só execute no lado do cliente
    }, []);

    return (
        <div className="h-screen w-screen bg-primary flex items-center justify-center flex-col gap-5">
            <h1 className="text-4xl font-bold">Erro 404</h1>
            <p>Ocorreu um erro: {(error as Error).message}</p>
            <div className="w-72 md:w-80 h-48 md:h-56 lg:h-60">
                {isClient && <LottieAnimation />} {/* Só renderiza no cliente */}
            </div>
        </div>
    );
};

export default ErrorRequest;
