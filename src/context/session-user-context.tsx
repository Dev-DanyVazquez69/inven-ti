import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Session } from 'next-auth';

type UserSessionContextType = {
    user: Session | undefined;
    logout: () => void;
};

const UserSessionContext = createContext<UserSessionContextType | undefined>(undefined);

export const UserSessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Session>();

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/auth/session');  // Faz uma chamada para a rota de API
            if (response.ok) {
                const session = await response.json();
                setUser(session);
            }
        };

        fetchSession();
    }, []);

    const logout = () => {
        console.log("Logout function called");
        // Implemente a lógica de logout aqui
    };

    return (
        <UserSessionContext.Provider value={{ user, logout }}>
            {children}
        </UserSessionContext.Provider>
    );
};

export const useUserSession = () => {
    const context = useContext(UserSessionContext);
    if (!context) {
        throw new Error("useUserSession must be used within a UserSessionProvider");
    }
    return context;
};
