import dayjs from 'dayjs';
import { Text } from '@mantine/core';
import { SchedulerBookingCard } from './SchedulerBookingCard';
import {
    Assignment,
    AssignmentInfoForScheduler,
    BookingScheduler,
    SchedulerItem
} from '../../types/entities';
import { SchedulerAssignmentCard } from './SchedulerAssignmentCard';
import { IncompleteAssignmentCard } from './IncompleteAssignmentCard.tsx';

export function SchedulerDay({
    date,
    items,
    onClick,
    disabled,
    isSelected,
    onAssignmentClick
}: {
    date: string;
    items: SchedulerItem[];
    onClick?: () => void;
    disabled?: boolean;
    isSelected?: boolean;
    onAssignmentClick?: (assignment: Assignment) => void;
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
                overflow: 'hidden',
                filter: disabled ? 'brightness(0.5)' : 'none',
                pointerEvents: disabled ? 'none' : 'auto',
                cursor:
                    disabled || onClick === undefined ? 'default' : 'pointer'
            }}
            onClick={onClick}
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
                    backgroundColor: 'var(--mantine-color-background-2)',
                    height: '100%',
                    padding: '0.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    overflow: 'hidden',
                    borderRadius: 'var(--mantine-radius-md)'
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
                                alert={booking.alert}
                            />
                        );
                    }
                    if (item.type === 'assignment') {
                        const assignment = item.item as Assignment;
                        return (
                            <SchedulerAssignmentCard
                                key={assignment.id}
                                item={assignment}
                                onClick={() => onAssignmentClick?.(assignment)}
                            />
                        );
                    }
                    const incompleteAssignment =
                        item.item as AssignmentInfoForScheduler;
                    return (
                        <IncompleteAssignmentCard
                            key={'incomplete_assignment'}
                            assignment={incompleteAssignment}
                        />
                    );
                })}
            </div>
        </div>
    );
}
