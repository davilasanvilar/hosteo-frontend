import Body from './Body';
import { ApiProvider } from './providers/ApiProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ScreenProvider } from './providers/ScreenProvider';
import { FlagsProvider } from './providers/FlagsProvider';
import { StrictMode } from 'react';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { LibraryProvider } from './providers/LibraryProvider';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

function App() {
    return (
        <StrictMode>
            <ScreenProvider>
                <FlagsProvider>
                    <ReactQueryProvider>
                        <AuthProvider>
                            <ApiProvider>
                                <LibraryProvider>
                                    <Body />
                                </LibraryProvider>
                            </ApiProvider>
                        </AuthProvider>
                    </ReactQueryProvider>
                </FlagsProvider>
            </ScreenProvider>
        </StrictMode>
    );
}

export default App;
