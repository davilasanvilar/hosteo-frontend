import dayjs from 'dayjs';
import { Text } from '@mantine/core';
import { SchedulerBookingCard } from './SchedulerBookingCard';
import {
    Assignment,
    BookingScheduler,
    SchedulerItem
} from '../../types/entities';
import { SchedulerAssignmentCard } from './SchedulerAssignmentCard';

export function SchedulerDay({
    date,
    items
}: {
    date: string;
    items: SchedulerItem[];
}) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                height: '100%',
                flex: 1,
                justifyContent: 'center',
                minWidth: '170px',
                overflow: 'hidden'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center'
                }}
            >
                <Text
                    c="dimmed"
                    style={{
                        textTransform: 'uppercase'
                    }}
                >
                    {dayjs(date).format('dd')}
                </Text>
                <Text fw={'bold'}>{dayjs(date).format('DD')}</Text>
            </div>
            <div
                style={{
                    backgroundColor: 'var(--mantine-color-background-1)',
                    height: '100%',
                    borderRadius: 'var(--mantine-radius-md)',
                    padding: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    overflow: 'hidden'
                }}
            >
                {items.map((item) => {
                    if (item.type === 'booking') {
                        const booking = item.item as BookingScheduler;
                        return (
                            <SchedulerBookingCard
                                key={booking.booking.id}
                                item={booking.booking}
                                isStart={item.isStart}
                            />
                        );
                    }
                    const assignment = item.item as Assignment;
                    return (
                        <SchedulerAssignmentCard
                            key={assignment.id}
                            item={assignment}
                        />
                    );
                })}
            </div>
        </div>
    );
}
