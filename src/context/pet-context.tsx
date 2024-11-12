"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type PetContextType = {
    selectedPetId: string | null;
    setSelectedPetId: (id: string) => void;
};

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
    const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

    // Ler do localStorage ao carregar o contexto
    useEffect(() => {
        const storedPetId = localStorage.getItem('selectedPetId');
        if (storedPetId) {
            setSelectedPetId(storedPetId);
        }
    }, []);

    // Salvar no localStorage ao alterar o selectedPetId
    useEffect(() => {
        if (selectedPetId) {
            localStorage.setItem('selectedPetId', selectedPetId);
        }
    }, [selectedPetId]);

    return (
        <PetContext.Provider value={{ selectedPetId, setSelectedPetId }}>
            {children}
        </PetContext.Provider>
    );
};

export const usePet = () => {
    const context = useContext(PetContext);
    if (!context) {
        throw new Error("usePet must be used within a PetProvider");
    }
    return context;
};
