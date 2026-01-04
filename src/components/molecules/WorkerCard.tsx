import { Worker } from '../../types/entities';
import { ActionIcon, Card, Image, Text, Title } from '@mantine/core';
import { WorkerStateBadge } from '../atoms/WorkerStateBadge';
import styles from '../styles/DataTable.module.css';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { CardControls } from '../atoms/CardControls';

export function WorkerCard({
    item,
    onClick,
    onEdit,
    onDelete
}: {
    item: Worker;
    onClick?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}) {
    console.log(onClick);
    return (
        <Card
            w={'100%'}
            miw={'12rem'}
            style={{ alignItems: 'center' }}
            className={onClick ? styles.selectableCard : undefined}
            onClick={onClick && (() => onClick(item.id))}
        >
            <Card.Section p={'1rem'}>
                <Image
                    src="/user_placeholder.svg"
                    w={'10rem'}
                    alt="Worker picture"
                />
            </Card.Section>
            <Card.Section
                style={{
                    display: 'flex',
                    width: '100%',
                    paddingBottom: '1rem',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    height: '100%'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text c="dimmed" size="sm">
                        {item.language}
                    </Text>
                    <Title order={4}>{item.name}</Title>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <WorkerStateBadge state={item.state} />

                    <CardControls
                        onEdit={onEdit && (() => onEdit(item.id))}
                        onDelete={onDelete && (() => onDelete(item.id))}
                    />
                </div>
            </Card.Section>
        </Card>
    );
}
