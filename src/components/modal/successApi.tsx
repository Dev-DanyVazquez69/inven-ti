import { useState, useEffect } from "react";

interface SuccessModalProps {
    message: string;
    onFinally: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onFinally }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev > 0 ? prev - 2 : 0));
        }, 100);

        const timeout = setTimeout(onFinally, 5000);
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onFinally]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-background p-6 rounded-lg shadow-lg w-96 border border-white">
                <h2 className="text-lg font-semibold text-green-600 mb-2">Sucesso!</h2>
                <p className="text-white">{message}</p>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
