import { Card, Skeleton } from '@mantine/core';

export function TemplateCardSkeleton() {
    return (
        <Card
            w={'100%'}
            miw={'8rem'}
            h={'8rem'}
            padding="lg"
            radius="md"
            withBorder
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <Skeleton height={24} width="60%" radius="sm" />
                <Skeleton height={20} width={80} radius="xl" />
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'space-between',
                    width: '100%'
                }}
            >
                <Skeleton height={16} width="30%" radius="sm" />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Skeleton height={24} width={24} radius="sm" />
                    <Skeleton height={24} width={24} radius="sm" />
                </div>
            </div>
        </Card>
    );
}
