import { Skeleton } from '@mantine/core';
import { ModalButtons } from '../molecules/ModalButtons';

export function WorkerFormSkeleton() {
    return (
        <div>
            <Skeleton height={36} width="100%" mb="0.5rem" radius="md" />
            <Skeleton height={36} width="100%" mb="0.5rem" radius="md" />
            <Skeleton height={36} width="100%" mb="0.5rem" radius="md" />
            <Skeleton height={36} width="100%" mb="2rem" radius="md" />

            <ModalButtons>
                <Skeleton height={36} width={80} radius="md" />
                <Skeleton height={36} width={80} radius="md" />
            </ModalButtons>
        </div>
    );
}
