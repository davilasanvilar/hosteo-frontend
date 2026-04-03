import { IconAlertTriangle } from '@tabler/icons-react';
import { BookingScheduler, Task } from '../../types/entities';
import { Alert } from '../../types/enums';
import { Text } from '@mantine/core';
import { TaskCategoryBadge } from '../atoms/TaskCategoryBadge';

export function BookingAndTaskInfo({
    bookingToAssign,
    taskToAssign
}: {
    bookingToAssign: BookingScheduler;
    taskToAssign: Task;
}) {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                maxWidth: '25rem'
            }}
        >
            <span
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <IconAlertTriangle
                    color={
                        bookingToAssign?.alert === Alert.DAYS_LEFT_5_UNASSIGNED
                            ? 'var(--mantine-color-yellow-5)'
                            : 'var(--mantine-color-error-5)'
                    }
                    size={24}
                    style={{ flexShrink: 0 }}
                />
                <Text c="dimmed" lineClamp={1}>
                    {bookingToAssign?.booking.apartment.name}
                </Text>
            </span>
            <div
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <Text lineClamp={1}>{taskToAssign?.name}</Text>
                {taskToAssign?.category && (
                    <TaskCategoryBadge category={taskToAssign.category} />
                )}
                <Text lineClamp={1} style={{ flexShrink: 0 }}>
                    {taskToAssign?.duration} min
                </Text>
            </div>
        </div>
    );
}
