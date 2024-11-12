'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("@/components/(lottieAnimation)/404/lottie"), {
    ssr: false,
});

const AnimationLottie404 = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Garante que o código só execute no lado do cliente
    }, []);

    return (
        <div className="mx-3">
            {isClient && <LottieAnimation />} {/* Só renderiza no cliente */}
        </div>
    );
};

export default AnimationLottie404;
