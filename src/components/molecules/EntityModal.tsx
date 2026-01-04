import { Modal } from '@mantine/core';
import React, { ComponentType, useState } from 'react';
import { useCrud } from '../../hooks/useCrud';
import { useQuery } from '@tanstack/react-query';
import { BaseEntity } from '../../types/entities';

interface EntityModalProps {
    opened: boolean;
    onClose: () => void;
    title: React.ReactNode;
    children: React.ReactNode;
    onExited?: () => void;
}

export function EntityModal({
    opened,
    onClose,
    title,
    children,
    onExited
}: EntityModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size={'lg'}
            title={title}
            transitionProps={{
                onExited: () => onExited?.()
            }}
        >
            {children}
        </Modal>
    );
}

interface EntityModalBodyProps<T extends BaseEntity> {
    entity?: T;
    onClose?: () => void;
}

interface UseEntityModalProps<T extends BaseEntity> {
    entityName: string;
    queryKey: string;
    title?: (entity: T | undefined) => React.ReactNode;
    ModalBodyComponent: ComponentType<EntityModalBodyProps<T>>;
    ModalBodySkeleton: ComponentType;
}

interface UseEntityModalReturn {
    onOpen: (id?: string) => void;
    onClose: () => void;
    modalComponent: JSX.Element;
}

export const useEntityModal = <T extends BaseEntity>({
    entityName,
    queryKey,
    title,
    ModalBodyComponent,
    ModalBodySkeleton
}: UseEntityModalProps<T>): UseEntityModalReturn => {
    const [entityId, setEntityId] = useState<string | undefined>(undefined);

    const { get } = useCrud<T>(entityName);

    const { data: entity, isLoading } = useQuery<T | undefined>({
        queryKey: [queryKey, entityId],
        queryFn: () => (entityId ? get(entityId) : undefined),
        enabled: !!entityId
    });

    const [opened, setOpened] = React.useState(false);

    const onOpenModal = (id?: string) => {
        if (id) {
            setEntityId(id);
        }
        setOpened(true);
    };

    const onCloseModal = () => {
        setOpened(false);
    };

    const defaultTitle = entityId
        ? `Update ${entityName}`
        : `New ${entityName}`;

    return {
        onOpen: onOpenModal,
        onClose: onCloseModal,
        modalComponent: (
            <EntityModal
                opened={opened}
                onClose={onCloseModal}
                title={title ? title(entity) : defaultTitle}
                onExited={() => setEntityId(undefined)}
            >
                {isLoading && entityId ? (
                    <ModalBodySkeleton />
                ) : (
                    <ModalBodyComponent
                        onClose={onCloseModal}
                        entity={entity}
                    />
                )}
            </EntityModal>
        )
    };
};
