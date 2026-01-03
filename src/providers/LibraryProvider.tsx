import { ReactNode, useMemo } from 'react';
import {
    Badge,
    Button,
    Checkbox,
    createTheme,
    Fieldset,
    Input,
    MantineProvider,
    Modal,
    MultiSelect,
    Pagination,
    Switch,
    Table,
    TextInput
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useScreen } from '../hooks/useScreen';
import { Select } from '@mantine/core';

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
    const { isTablet } = useScreen();

    const theme = useMemo(() => {
        const defaultSize = isTablet ? 'sm' : 'md';
        return createTheme({
            colors: {
                background: [
                    '#f5f5f5',
                    '#f5f5f5',
                    '#f5f5f5',
                    '#f5f5f5',
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
                ],
                warning: [
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005',
                    '#FAB005'
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
                Select: Select.extend({
                    defaultProps: {
                        size: defaultSize
                    }
                }),
                MultiSelect: MultiSelect.extend({
                    defaultProps: {
                        size: defaultSize
                    }
                }),
                Pagination: Pagination.extend({
                    defaultProps: {
                        size: isTablet ? 'sm' : 'lg'
                    }
                }),
                Input: Input.extend({
                    styles: (_theme, props) => ({
                        input: {
                            '--input-bg':
                                props.variant === 'outlined'
                                    ? 'white'
                                    : 'var(--mantine-color-gray-2)',
                            '--input-bd':
                                props.variant === 'outlined'
                                    ? 'var(--mantine-color-gray-3)'
                                    : 'var(--mantine-color-gray-2)'
                        }
                    })
                }),
                TextInput: TextInput.extend({
                    defaultProps: {
                        w: isTablet ? 'auto' : '100%',
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
                }),
                Badge: Badge.extend({
                    defaultProps: {
                        size: defaultSize
                    },
                    styles: {
                        label: {
                            overflow: 'visible'
                        }
                    }
                }),
                Switch: Switch.extend({
                    defaultProps: {
                        size: isTablet ? 'sm' : 'lg'
                    }
                }),
                Modal: Modal.extend({
                    defaultProps: {
                        fullScreen: isTablet ? false : true
                    },
                    styles: {
                        content: {
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'var(--mantine-color-background-1)'
                        },
                        body: {
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            overflow: 'auto'
                        },
                        header: {
                            backgroundColor: 'transparent'
                        }
                    }
                }),
                Table: Table.extend({})
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
