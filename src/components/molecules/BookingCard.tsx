import { Booking } from '../../types/entities';
import { Card, Text, Title } from '@mantine/core';
import { BookingStateBadge } from '../atoms/BookingStateBadge';
import { ApartmentStateBadge } from '../atoms/ApartmentStateBadge';
import { PlatformIcon } from '../atoms/PlatformIcon';
import styles from '../styles/DataTable.module.css';
import dayjs from 'dayjs';
import { CardControls } from '../atoms/CardControls';

export function BookingCard({
    item,
    onClick,
    onEdit,
    onDelete
}: {
    item: Booking;
    onClick?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <Card
            w={'100%'}
            miw={'10rem'} // Adjust as needed
            h={'12rem'}
            className={onClick ? styles.selectableCard : undefined}
            onClick={onClick && (() => onClick(item.id))}
            padding="0"
            radius="md"
        >
            <Card.Section
                style={{
                    position: 'relative',
                    height: '80px',
                    backgroundImage: 'url(apartment_placeholder.svg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Overlay content */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)'
                    }}
                >
                    {/* Top Row: Name and State */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        <Title order={4} c="black">
                            {item.apartment.name}
                        </Title>
                        {/* Wrapper for the badge to ensure it stands out */}
                        <ApartmentStateBadge state={item.apartment.state} />
                    </div>
                </div>
            </Card.Section>

            <Card.Section
                p="md"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    height: 'calc(100% - 140px)'
                }}
            >
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.5rem'
                        }}
                    >
                        <Text size="sm" fw={500}>
                            {formatDate(dayjs.unix(item.startDate).toDate())} -{' '}
                            {formatDate(dayjs.unix(item.endDate).toDate())}
                        </Text>
                        <BookingStateBadge state={item.state} />
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center'
                        }}
                    >
                        <PlatformIcon platform={item.source} />
                        <Text fw={500}>{item.name}</Text>
                    </div>
                    <CardControls
                        onEdit={onEdit && (() => onEdit(item.id))}
                        onDelete={onDelete && (() => onDelete(item.id))}
                    />
                </div>
            </Card.Section>
        </Card>
    );
}
