import { Card, Text, Title } from '@mantine/core';
import { CardControls } from '../atoms/CardControls';
import { Assignment } from '../../types/entities';
import styles from '../styles/DataTable.module.css';
import { AssignmentStateBadge } from '../atoms/AssignmentStateBadge';

interface AssignmentCardProps {
    item: Assignment;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onClick?: (id: string) => void;
}

export function AssignmentCard({
    item,
    onEdit,
    onDelete,
    onClick
}: AssignmentCardProps) {
    return (
        <Card
            w={'100%'}
            miw={'8rem'}
            h={'8rem'}
            style={{
                alignItems: 'center',
                gap: '1rem',
                justifyContent: 'space-between'
            }}
            className={onClick ? styles.selectableCard : undefined}
            onClick={onClick && (() => onClick(item.id))}
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
                <Title
                    order={4}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden'
                    }}
                >
                    {item.task.name}
                </Title>
                <AssignmentStateBadge state={item.state} />
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
                <Text
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        overflow: 'hidden'
                    }}
                >
                    {item.worker.name}
                </Text>
                <CardControls
                    onEdit={onEdit && (() => onEdit(item.id))}
                    onDelete={onDelete && (() => onDelete(item.id))}
                />
            </div>
        </Card>
    );
}
