import {
    IconBan,
    IconBrandAirbnb,
    IconBrandBooking
} from '@tabler/icons-react';

export function PlatformIcon({
    platform,
    size = 20
}: {
    platform: string;
    size?: number;
}) {
    const style = {
        verticalAlign: 'middle',
        flexShrink: 0
    };
    switch (platform.toLowerCase()) {
        case 'airbnb':
            return (
                <IconBrandAirbnb size={size} color="#C42A48" style={style} />
            );
        case 'booking':
            return (
                <IconBrandBooking size={size} color="#2E4A8A" style={style} />
            );
        default:
            return <IconBan size={size} color="black" style={style} />;
    }
}
