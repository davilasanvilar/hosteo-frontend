import { Apartment } from '../../types/entities';
import { ActionIcon, Card, Image, Text, Title } from '@mantine/core';
import { ApartmentStateBadge } from '../atoms/ApartmentStateBadge';
import { addressToString } from '../../utils/utilFunctions';
import styles from './ApartmentCard.module.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export function ApartmentCard({
    item,
    onClick,
    onEdit,
    onDelete
}: {
    item: Apartment;
    onClick?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}) {
    return (
        <Card
            w={'100%'}
            miw={'20rem'}
            h={'18rem'}
            className={styles.card}
            onClick={onClick}
        >
            <Card.Section>
                <Image
                    src="/apartment_placeholder.svg"
                    height={160}
                    alt="Apartment picture"
                />
            </Card.Section>
            <Card.Section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    gap: '0.5rem',
                    height: '100%'
                }}
            >
                <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Title order={4}>{item.name}</Title>
                    <ApartmentStateBadge state={item.state} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        alignItems: 'flex-end',
                        height: '100%'
                    }}
                >
                    <Text c="dimmed" size="sm">
                        {addressToString(item.address)}
                    </Text>
                    <div
                        style={{
                            gap: '0.5rem',
                            display: 'flex'
                        }}
                    >
                        <ActionIcon
                            variant="transparent"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.();
                            }}
                        >
                            <IconEdit />
                        </ActionIcon>
                        <ActionIcon
                            variant="transparent"
                            color="error"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.();
                            }}
                        >
                            <IconTrash />
                        </ActionIcon>
                    </div>
                </div>
            </Card.Section>
        </Card>
    );
}
