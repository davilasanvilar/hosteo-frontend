import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';

interface ReactQueryContext {
    queryClient: QueryClient;
}

export const ReactQueryContext = React.createContext<ReactQueryContext>(
    {} as ReactQueryContext
);

//This provider is used to get the queryClient instance from the context and to have the QueryClientProvider
//declaration encapsulated
//We can use the toast too, because from the App.tsx we are not able to use it as its not a child of the ToastProvider
export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    const value: ReactQueryContext = {
        queryClient: queryClient
    };

    return (
        <ReactQueryContext.Provider value={value}>
            <QueryClientProvider client={queryClient}>
                {children}
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </ReactQueryContext.Provider>
    );
};
