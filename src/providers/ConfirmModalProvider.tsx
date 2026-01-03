import { Button, Modal } from '@mantine/core';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { ExtendedCustomColors } from '../mantine';
import { ModalButtons } from '../components/molecules/ModalButtons';

export interface ConfirmModalContext {
    openModal: (props: ConfirmModalProperties) => void;
}
export interface ConfirmModalProperties {
    title: ReactNode;
    message: ReactNode;
    color: ExtendedCustomColors;
    onConfirm: () => void;
}
export const ConfirmModalContext = createContext<ConfirmModalContext>(
    {} as ConfirmModalContext
);

export const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
    const value: ConfirmModalContext = {
        openModal: (props: ConfirmModalProperties) => {
            setConfirmModalProperties(props);
        }
    };
    const [opened, setOpened] = useState<boolean>(false);
    const [confirmModalProperties, setConfirmModalProperties] = useState<
        ConfirmModalProperties | undefined
    >(undefined);

    useEffect(() => {
        if (confirmModalProperties) {
            setOpened(true);
        }
    }, [confirmModalProperties]);

    const { title, message, color, onConfirm } = confirmModalProperties || {};

    return (
        <ConfirmModalContext.Provider value={value}>
            <Modal
                title={title}
                opened={opened}
                onClose={() => setOpened(false)}
            >
                {message}
                <ModalButtons>
                    <Button
                        onClick={() => setConfirmModalProperties(undefined)}
                        color={color}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => onConfirm && onConfirm()}
                        color={color}
                        variant="filled"
                    >
                        Confirm
                    </Button>
                </ModalButtons>
            </Modal>

            {children}
        </ConfirmModalContext.Provider>
    );
};
