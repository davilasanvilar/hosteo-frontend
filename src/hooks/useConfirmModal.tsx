import { useContext } from 'react';
import { ConfirmModalContext } from '../providers/ConfirmModalProvider';

export const useConfirmModal = () => {
    const ctx = useContext(ConfirmModalContext);
    if (ctx === null) {
        throw new Error(
            'useConfirmModal() can only be used on the descendants of ConfirmModalProvider'
        );
    } else {
        return ctx;
    }
};
