'use client'

const LoadingRequest: React.FC = () => {

    return (
        <div className="h-screen w-screen bg-primary flex items-center justify-center flex-col gap-5">
            <div className="flex flex-col gap-3 justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                <p className="font-black text-lg">Carregando</p>
            </div>
        </div>
    );
};

export default LoadingRequest;
