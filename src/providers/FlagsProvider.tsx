import { createContext, ReactNode, useState } from 'react';

export interface FlagsContext {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FlagsContext = createContext<FlagsContext>({} as FlagsContext);

export const FlagsProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const value: FlagsContext = {
        isLoading,
        setIsLoading
    };

    return (
        <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>
    );
};
