import { ReactNode, useMemo } from 'react';
import {
    Button,
    Checkbox,
    createTheme,
    Fieldset,
    MantineProvider,
    TextInput
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useScreen } from '../hooks/useScreen';

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
    const { isTablet } = useScreen();

    const theme = useMemo(() => {
        const defaultSize = isTablet ? 'sm' : 'md';
        return createTheme({
            colors: {
                background: [
                    '#fff',
                    '#f5f5f5',
                    '#F1F2F4',
                    '#F1F2F4',
                    '#f5f5f5',
                    '#f5f5f5',
                    '#f5f5f5',
                    '#f5f5f5',
                    '#f5f5f5',
                    '#f5f5f5'
                ],
                primary: [
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9',
                    '#5385F9'
                ],
                success: [
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886',
                    '#12B886'
                ],
                error: [
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252',
                    '#FA5252'
                ]
            },
            primaryColor: 'primary',
            fontFamily: 'Inter, sans-serif',
            components: {
                Button: Button.extend({
                    defaultProps: {
                        size: defaultSize
                    }
                }),
                TextInput: TextInput.extend({
                    defaultProps: {
                        size: defaultSize,
                        radius: 'md' // You can also default the rounded corners while you're at it!
                    },
                    styles: {
                        wrapper: {
                            minHeight: '1rem',
                            marginBottom: '0.4rem'
                        },
                        error: {
                            position: 'absolute'
                        }
                    }
                }),
                Fieldset: Fieldset.extend({
                    defaultProps: {
                        variant: 'unstyled'
                    },
                    styles: {
                        legend: {
                            fontSize: 'var(--mantine-font-size-md)'
                        }
                    }
                }),
                Checkbox: Checkbox.extend({
                    defaultProps: {
                        size: defaultSize
                    }
                })
            }
        });
    }, [isTablet]);
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            {children}
        </MantineProvider>
    );
};
