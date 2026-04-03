import { Accordion, Text } from '@mantine/core';
import { BookingScheduler } from '../../types/entities';
import { Alert } from '../../types/enums';
import { IconAlertTriangle } from '@tabler/icons-react';
import { conf } from '../../../conf';
import dayjs from 'dayjs';
import { TaskOrTemplateCard } from './TaskOrTemplateCard';
import { useSchedulerContext } from '../../hooks/useSchedulerContext';

export function AlertBooking({ booking }: { booking: BookingScheduler }) {
    const { handleCreateNewAssignment: onOpenAssignmentScheduler } =
        useSchedulerContext();

    return (
        <Accordion.Item key={booking.booking.id} value={booking.booking.id}>
            <Accordion.Control>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.5rem'
                        }}
                    >
                        {booking.alert === Alert.DAYS_LEFT_5_UNASSIGNED ? (
                            <IconAlertTriangle
                                color="var(--mantine-color-yellow-5)"
                                size={24}
                                style={{ flexShrink: 0 }}
                            />
                        ) : (
                            <IconAlertTriangle
                                color="var(--mantine-color-error-5)"
                                size={24}
                                style={{ flexShrink: 0 }}
                            />
                        )}
                        <Text lineClamp={1}>
                            {booking.booking.apartment.name}
                        </Text>
                    </div>
                    <Text fw={'bold'}>
                        {dayjs
                            .unix(booking.booking.startDate)
                            .format(conf.dateTimeFormat)}
                    </Text>
                </div>
            </Accordion.Control>
            <Accordion.Panel
                styles={{
                    content: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        paddingTop: '0.5rem'
                    }
                }}
            >
                {booking.unassignedTasks.map((task) => (
                    <TaskOrTemplateCard
                        key={task.id}
                        item={task}
                        onClick={() => {
                            onOpenAssignmentScheduler(booking, task);
                        }}
                    />
                ))}
            </Accordion.Panel>
        </Accordion.Item>
    );
}
