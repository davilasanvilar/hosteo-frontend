import { Booking } from '../../types/entities';
import { Card, Text, Title } from '@mantine/core';
import { BookingStateBadge } from '../atoms/BookingStateBadge';
import styles from '../styles/DataTable.module.css';
import dayjs from 'dayjs';
import { conf } from '../../../conf';
import { Alert } from '../../types/enums';

const getAlertColor = (alert: Alert | undefined) => {
    if (!alert) {
        return '#343A40';
    }
    if (alert === Alert.DAYS_LEFT_5_UNASSIGNED) {
        return 'var(--mantine-color-orange-6)';
    } else {
        return 'var(--mantine-color-yellow-6)';
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
    return (
        <Card
            w={'100%'}
            className={onClick ? styles.selectableCard : undefined}
            onClick={onClick && (() => onClick(item.id))}
            padding="0"
            radius={'0'}
            style={{
                borderColor: getAlertColor(alert),
                borderWidth: '2px',
                borderStyle: 'solid',
                borderTop: isStart ? '2px solid' : 'none',
                borderBottom: isStart ? 'none' : '2px solid',
                borderTopLeftRadius: isStart ? '0.5rem' : 'none',
                borderTopRightRadius: isStart ? '0.5rem' : 'none',
                borderBottomLeftRadius: isStart ? 'none' : '0.5rem',
                borderBottomRightRadius: isStart ? 'none' : '0.5rem'
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
                        {item.apartment.name}
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
