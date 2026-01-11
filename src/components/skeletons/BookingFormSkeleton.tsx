import { Group, Skeleton, TextInput } from '@mantine/core';
import { ModalButtons } from '../molecules/ModalButtons';

export function BookingFormSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Group grow>
                <Skeleton height={50} radius="md" />
                <Skeleton height={50} radius="md" />
            </Group>
            <Skeleton height={50} radius="md" />
            <Skeleton height={50} radius="md" />
            <Skeleton height={50} radius="md" />
            <ModalButtons>
                <Skeleton height={36} width={80} radius="md" />
                <Skeleton height={36} width={80} radius="md" />
            </ModalButtons>
        </div>
    );
}
