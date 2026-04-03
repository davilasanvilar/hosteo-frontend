import { Accordion, Drawer } from '@mantine/core';
import { BookingScheduler } from '../../types/entities';
import { AlertsIndicator } from '../atoms/AlertsIndicator';
import { AlertBooking } from '../molecules/AlertBooking';

export function AlertsDrawer({
    opened,
    onClose,
    redAlertBookings,
    yellowAlertBookings
}: {
    opened: boolean;
    onClose: () => void;
    redAlertBookings: BookingScheduler[];
    yellowAlertBookings: BookingScheduler[];
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
                    <AlertBooking key={booking.booking.id} booking={booking} />
                ))}
                {yellowAlertBookings.map((booking) => (
                    <AlertBooking key={booking.booking.id} booking={booking} />
                ))}
            </Accordion>
        </Drawer>
    );
}
