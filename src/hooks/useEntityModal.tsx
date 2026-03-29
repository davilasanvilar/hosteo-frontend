import { useQuery } from '@tanstack/react-query';
import React, { ComponentType, useState } from 'react';
import { EntityModal } from '../components/molecules/EntityModal';
import { BaseEntity } from '../types/entities';
import { useCrud } from './useCrud';

interface EntityModalBodyProps<T extends BaseEntity> {
    entity?: T;
    onClose?: () => void;
    relatedEntityId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    relatedEntity?: any;
}

interface UseEntityModalProps<T extends BaseEntity> {
    entityName: string;
    queryKey: string;
    relatedEntityId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    relatedEntity?: any;
    getTitle?: (entity: T | undefined) => React.ReactNode;
    removeHeader?: boolean;
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
    getTitle,
    relatedEntityId,
    relatedEntity,
    removeHeader,
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
        setEntityId(undefined);
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
                title={
                    removeHeader
                        ? undefined
                        : getTitle
                          ? getTitle(entity)
                          : defaultTitle
                }
                removeHeader={removeHeader}
            >
                {isLoading && entityId ? (
                    <ModalBodySkeleton />
                ) : (
                    <ModalBodyComponent
                        onClose={onCloseModal}
                        entity={entity}
                        relatedEntityId={relatedEntityId}
                        relatedEntity={relatedEntity}
                    />
                )}
            </EntityModal>
        )
    };
};
