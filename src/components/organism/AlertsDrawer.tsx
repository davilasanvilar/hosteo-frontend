import { Accordion, Drawer } from '@mantine/core';
import { BookingScheduler, Task } from '../../types/entities';
import { AlertsIndicator } from '../atoms/AlertsIndicator';
import { AlertBooking } from '../molecules/AlertBooking';

export function AlertsDrawer({
    opened,
    onClose,
    redAlertBookings,
    yellowAlertBookings,
    handleCreateNewAssignment
}: {
    opened: boolean;
    onClose: () => void;
    redAlertBookings: BookingScheduler[];
    yellowAlertBookings: BookingScheduler[];
    handleCreateNewAssignment: (booking: BookingScheduler, task?: Task) => void;
}) {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            closeOnEscape={false}
            onKeyDown={(e) => {
                if (e.key === 'Escape') {
                    e.stopPropagation();
                    onClose();
                }
            }}
            title={
                <AlertsIndicator
                    redAlertCount={redAlertBookings.length}
                    yellowAlertCount={yellowAlertBookings.length}
                />
            }
            position="right"
        >
            <Accordion>
                {redAlertBookings.map((booking) => (
                    <AlertBooking
                        key={booking.booking.id}
                        booking={booking}
                        handleCreateNewAssignment={handleCreateNewAssignment}
                    />
                ))}
                {yellowAlertBookings.map((booking) => (
                    <AlertBooking
                        key={booking.booking.id}
                        booking={booking}
                        handleCreateNewAssignment={handleCreateNewAssignment}
                    />
                ))}
            </Accordion>
        </Drawer>
    );
}
