import { Card, Skeleton } from '@mantine/core';

export function ApartmentSimpleCardSkeleton() {
    return (
        <Card w={'100%'} miw={'15rem'} h={'12rem'} padding="0">
            <Card.Section>
                <Skeleton height={140} width="100%" radius={0} />
            </Card.Section>
            <Card.Section
                p="xs"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100% - 140px)'
                }}
            >
                <Skeleton height={20} width="60%" radius="md" />
            </Card.Section>
        </Card>
    );
}
