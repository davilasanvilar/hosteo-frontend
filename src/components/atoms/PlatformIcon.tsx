import {
    IconBan,
    IconBrandAirbnb,
    IconBrandBooking
} from '@tabler/icons-react';

export function PlatformIcon({
    platform,
    size = 16
}: {
    platform: string;
    size?: number;
}) {
    switch (platform.toLowerCase()) {
        case 'airbnb':
            return (
                <IconBrandAirbnb
                    size={size}
                    color="#C42A48"
                    style={{ verticalAlign: 'middle' }}
                />
            );
        case 'booking':
            return (
                <IconBrandBooking
                    size={size}
                    color="#2E4A8A"
                    style={{ verticalAlign: 'middle' }}
                />
            );
        default:
            return (
                <IconBan
                    size={size}
                    color="black"
                    style={{ verticalAlign: 'middle' }}
                />
            );
    }
}
