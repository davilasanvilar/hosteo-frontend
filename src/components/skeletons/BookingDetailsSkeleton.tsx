import { Group, Skeleton } from '@mantine/core';
import { ModalButtons } from '../molecules/ModalButtons';

export function BookingDetailsSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Group grow>
                <Skeleton height={50} radius="md" />
                <Skeleton height={50} radius="md" />
            </Group>
            <Skeleton height={50} radius="md" />
            <Skeleton height={50} radius="md" />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '1rem'
                }}
            >
                <Skeleton height={36} width={80} radius="md" />
            </div>
        </div>
    );
}
