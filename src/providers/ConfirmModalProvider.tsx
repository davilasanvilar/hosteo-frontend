import { createContext, ReactNode } from 'react';
import { useConfirmModal, IUseConfirmModal } from '../hooks/useConfirmModal';

type IConfirmModalContext = Omit<IUseConfirmModal, 'modalComponent'>;

export const ConfirmModalContext = createContext<IConfirmModalContext>(
    {} as IConfirmModalContext
);

export const ConfirmModalProvider = ({ children }: { children: ReactNode }) => {
    const { openModal, modalComponent: ModalComponent } = useConfirmModal();

    const value: IConfirmModalContext = {
        openModal
    };

    return (
        <ConfirmModalContext.Provider value={value}>
            {ModalComponent}
            {children}
        </ConfirmModalContext.Provider>
    );
};
