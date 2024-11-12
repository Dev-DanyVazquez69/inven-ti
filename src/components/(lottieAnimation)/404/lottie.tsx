import animationData from "../../../../public/assets/animations/cat-404.json"; // Coloque aqui o caminho para o arquivo JSON da animação
import Lottie from 'react-lottie';

export default function LottieConf404() {

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
            style={{ width: '100%', height: '100%' }}
            isStopped={false} // Controle manual para parar
            isPaused={false}  // Controle manual para pausar
        />
    )
}

