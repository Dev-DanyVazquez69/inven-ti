"use client"

import { ReactNode } from 'react';
import { UserSessionProvider } from '@/context/session-user-context';
import { PetProvider } from '@/context/pet-context';

// GlobalProvider envolve os outros contextos
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    return (
        <UserSessionProvider>
            <PetProvider>
                {children}
            </PetProvider>
        </UserSessionProvider>
    );
};
