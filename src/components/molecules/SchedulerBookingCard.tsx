import { Booking } from '../../types/entities';
import { Card, Text, Title } from '@mantine/core';
import { BookingStateBadge } from '../atoms/BookingStateBadge';
import styles from '../styles/DataTable.module.css';
import dayjs from 'dayjs';
import { conf } from '../../../conf';
import { Alert } from '../../types/enums';
import { useMemo } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';

const getAlertColor = (alert: Alert | undefined) => {
    if (!alert) {
        return 'hsla(210, 10%, 40%, 1.00)';
    }
    if (alert === Alert.DAYS_LEFT_5_UNASSIGNED) {
        return 'var(--mantine-color-yellow-6)';
    } else {
        return 'var(--mantine-color-error-5)';
    }
};
export function SchedulerBookingCard({
    item,
    isStart,
    alert,
    onClick
}: {
    item: Booking;
    isStart?: boolean;
    alert?: Alert;
    onClick?: (id: string) => void;
}) {
    const alertColor = useMemo(() => getAlertColor(alert), [alert]);

    return (
        <Card
            w={'100%'}
            className={onClick ? styles.selectableCard : undefined}
            onClick={onClick && (() => onClick(item.id))}
            padding="0"
            shadow="sm"
            radius={'0'}
            style={{
                borderLeft: '3px solid ' + alertColor,
                borderRight: '3px solid ' + alertColor,
                borderTop: isStart ? '3px solid ' + alertColor : 'none',
                borderBottom: isStart ? 'none' : '3px solid ' + alertColor,
                borderTopLeftRadius: `${isStart ? '0.5rem' : '0'}`,
                borderTopRightRadius: `${isStart ? '0.5rem' : '0'}`,
                borderBottomLeftRadius: `${isStart ? '0' : '0.5rem'}`,
                borderBottomRightRadius: `${isStart ? '0' : '0.5rem'}`
            }}
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
                    <div
                        style={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {alert && (
                            <IconAlertTriangle
                                color={alertColor}
                                size={16}
                                style={{ flexShrink: 0 }}
                            />
                        )}
                        <Title
                            order={4}
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 1,
                                overflow: 'hidden',
                                fontSize: '0.875rem'
                            }}
                            fw={'lighter'}
                            c="black"
                        >
                            {item.apartment.name}
                        </Title>
                    </div>
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
                        <BookingStateBadge state={item.state} size="sm" />
                    </div>
                </div>
            </Card.Section>
        </Card>
    );
}
