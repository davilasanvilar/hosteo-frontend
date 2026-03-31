import { Assignment } from '../../types/entities';
import { Card, Text, Title } from '@mantine/core';
import styles from '../styles/DataTable.module.css';
import dayjs from 'dayjs';
import { conf } from '../../../conf';
import { AssignmentStateBadge } from '../atoms/AssignmentStateBadge';

export function SchedulerAssignmentCard({
    item,
    onClick
}: {
    item: Assignment;
    onClick?: (id: string) => void;
}) {
    return (
        <Card
            w={'100%'}
            className={onClick ? styles.selectableCard : undefined}
            onClick={onClick && (() => onClick(item.id))}
            padding="0"
            radius="md"
        >
            <Card.Section
                style={{
                    position: 'relative',
                    height: '36px',
                    backgroundImage: 'url(apartment_placeholder.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '0.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                    }}
                >
                    <Title
                        order={4}
                        style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            fontSize: '1rem'
                        }}
                        fw={'lighter'}
                        c="black"
                    >
                        {item.task.name}
                    </Title>
                </div>
            </Card.Section>

            <Card.Section
                p="0.5rem"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div>
                    <Text size="sm" fw={'bold'}>
                        {item.task.name}
                    </Text>
                    <Text size="sm" fw={'bold'}>
                        {item.worker.name}
                    </Text>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text size="sm" fw={'bold'}>
                            {dayjs.unix(item.startDate).format(conf.timeFormat)}
                        </Text>
                        <AssignmentStateBadge state={item.state} size="sm" />
                    </div>
                </div>
            </Card.Section>
        </Card>
    );
}
