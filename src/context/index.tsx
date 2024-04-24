import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Token = string;
type SetToken = (newToken: Token) => void;

interface TokenContextType {
    token: Token;
    setToken: SetToken;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<Token>('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    const storeToken: SetToken = (newToken) => {
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ token, setToken: storeToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
