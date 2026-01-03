import { Image, Modal, Text, Title } from '@mantine/core';
import { Apartment } from '../../types/entities';
import { useCrud } from '../../hooks/useCrud';
import { useQuery } from '@tanstack/react-query';
import { ApartmentStateBadge } from '../atoms/ApartmentStateBadge';
import { addressToString } from '../../utils/utilFunctions';
import { PlatformIcon } from '../atoms/PlatformIcon';
import { useScreen } from '../../hooks/useScreen';

export function ApartmentDetails({
    apartmentId,
    onClose
}: {
    apartmentId: string;
    onClose: () => void;
}) {
    const { isTablet } = useScreen();
    const { get } = useCrud<Apartment>('apartment');

    const { data: apartment } = useQuery({
        queryKey: ['apartment', apartmentId],
        queryFn: () => get(apartmentId)
    });

    return (
        apartment && (
            <Modal
                opened={!!apartmentId}
                onClose={onClose}
                size={'lg'}
                title={
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center'
                        }}
                    >
                        <Title order={4}>{apartment.name}</Title>
                        <ApartmentStateBadge state={apartment.state} />
                    </div>
                }
            >
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
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
                        {apartment.airbnbId && (
                            <div>
                                <PlatformIcon platform={'airbnb'} size={24} />
                                <Text component="span" ml={'0.25rem'}>
                                    {apartment.airbnbId}
                                </Text>
                            </div>
                        )}
                        {apartment.bookingId && (
                            <div>
                                <PlatformIcon platform={'booking'} size={24} />
                                <Text component="span" ml={'0.25rem'}>
                                    {apartment.bookingId}
                                </Text>
                            </div>
                        )}
                        <Text c="dimmed">
                            {addressToString(apartment.address)}
                        </Text>
                    </div>
                </div>
            </Modal>
        )
    );
}
