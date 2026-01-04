import { Image, Text } from '@mantine/core';
import { Apartment } from '../../types/entities';
import { addressToString } from '../../utils/utilFunctions';
import { PlatformIcon } from '../atoms/PlatformIcon';
import { useScreen } from '../../hooks/useScreen';

export function ApartmentDetails({
    entity: apartment
}: {
    entity?: Apartment;
}) {
    const { isTablet } = useScreen();

    return (
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
                    width: '100%'
                }}
            >
                {apartment?.airbnbId && (
                    <div>
                        <PlatformIcon platform={'airbnb'} size={24} />
                        <Text component="span" ml={'0.25rem'}>
                            {apartment?.airbnbId}
                        </Text>
                    </div>
                )}
                {apartment?.bookingId && (
                    <div>
                        <PlatformIcon platform={'booking'} size={24} />
                        <Text component="span" ml={'0.25rem'}>
                            {apartment?.bookingId}
                        </Text>
                    </div>
                )}
                <Text c="dimmed">{addressToString(apartment?.address)}</Text>
            </div>
        </div>
    );
}
