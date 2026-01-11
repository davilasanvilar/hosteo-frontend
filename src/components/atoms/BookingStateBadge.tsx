import { Badge } from '@mantine/core';
import { BookingState } from '../../types/enums';
import { ExtendedCustomColors } from '../../mantine';

export function BookingStateBadge({
    state,
    noBg
}: {
    state: BookingState;
    noBg?: boolean;
}) {
    const getChipColor = (): ExtendedCustomColors => {
        switch (state) {
            case BookingState.FINISHED:
                return 'success';
            case BookingState.PENDING:
                return 'warning';
            case BookingState.CANCELLED:
                return 'error';
            case BookingState.IN_PROGRESS:
                return 'primary';
            default:
                return 'primary';
        }
    };

    return (
        <Badge
            style={{ overflow: 'visible' }}
            variant={noBg ? 'transparent' : 'light'}
            size="md"
            color={getChipColor()}
        >
            {state}
        </Badge>
    );
}
