import Body from './Body';
import { ApiProvider } from './providers/ApiProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ScreenProvider } from './providers/ScreenProvider';
import { FlagsProvider } from './providers/FlagsProvider';
import { StrictMode } from 'react';
import { ReactQueryProvider } from './providers/ReactQueryProvider';


function App() {
    return (
        // <StrictMode>
        <ScreenProvider>
            <FlagsProvider>
                <ReactQueryProvider>
                    <AuthProvider>
                        <ApiProvider>
                            <Body />
                        </ApiProvider>
                    </AuthProvider>
                </ReactQueryProvider>
            </FlagsProvider>
        </ScreenProvider>
        // </StrictMode>
    );
}

export default App;
