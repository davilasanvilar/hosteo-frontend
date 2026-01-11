import { Image, Text, useMantineTheme } from '@mantine/core';
import { Booking } from '../../types/entities';
import { useScreen } from '../../hooks/useScreen';
import { PlatformIcon } from '../atoms/PlatformIcon';
import { ApartmentStateBadge } from '../atoms/ApartmentStateBadge';
import dayjs from 'dayjs';
import { conf } from '../../../conf';
import { IconLogin, IconLogout } from '@tabler/icons-react';

export function BookingDetails({ entity: booking }: { entity?: Booking }) {
    const { isTablet } = useScreen();
    const theme = useMantineTheme();

    return booking ? (
        <div
            style={{
                display: 'flex',
                gap: '1rem',

                flexDirection: isTablet ? 'row' : 'column'
            }}
        >
            <Image
                src="/apartment_placeholder.svg"
                height={120}
                style={{
                    objectFit: 'contain',
                    objectPosition: isTablet ? 'left' : 'center'
                }}
                alt="Apartment picture"
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '100%',
                    justifyContent: 'space-between'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}
                >
                    <PlatformIcon platform={booking.source} size={24} />
                    <Text>{booking.apartment.name}</Text>
                    <ApartmentStateBadge state={booking.apartment.state} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexDirection: 'column'
                    }}
                >
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <IconLogin color={theme.colors.success[5]} />
                        <Text>
                            {dayjs
                                .unix(booking.startDate)
                                .format(conf.dateTimeWithWeekDayAndTime)}
                        </Text>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <IconLogout color={theme.colors.error[5]} />
                        <Text>
                            {dayjs
                                .unix(booking.endDate)
                                .format(conf.dateTimeWithWeekDayAndTime)}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
}
