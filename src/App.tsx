import Body from './Body';
import { ApiProvider } from './providers/ApiProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ScreenProvider } from './providers/ScreenProvider';
import { StrictMode } from 'react';
import { ReactQueryProvider } from './providers/ReactQueryProvider';
import { LibraryProvider } from './providers/LibraryProvider';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { BrowserRouter } from 'react-router-dom';
import { ConfirmModalProvider } from './providers/ConfirmModalProvider';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

function App() {
    return (
        <StrictMode>
            <ScreenProvider>
                <ReactQueryProvider>
                    <ApiProvider>
                        <LibraryProvider>
                            <ConfirmModalProvider>
                                <ModalsProvider
                                    labels={{
                                        cancel: 'Cancel',
                                        confirm: 'Confirm'
                                    }}
                                >
                                    <BrowserRouter>
                                        <AuthProvider>
                                            <Body />
                                        </AuthProvider>
                                    </BrowserRouter>
                                </ModalsProvider>
                            </ConfirmModalProvider>
                        </LibraryProvider>
                    </ApiProvider>
                </ReactQueryProvider>
            </ScreenProvider>
        </StrictMode>
    );
}

export default App;
