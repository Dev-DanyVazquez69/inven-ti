import animationData from "../../../../public/assets/animations/error.json"; // Coloque aqui o caminho para o arquivo JSON da animação
import Lottie from 'react-lottie';

export default function LottieConfError() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <Lottie
            options={defaultOptions}
            style={{ width: '100%', height: '75%', maxHeight:'225px' }}
            isStopped={false} // Controle manual para parar
            isPaused={false}  // Controle manual para pausar
        />
    )
}

