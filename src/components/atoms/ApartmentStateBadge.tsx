import { ApartmentState } from '../../types/enums';
import { Badge } from '@mantine/core';
import { ExtendedCustomColors } from '../../mantine';

export function ApartmentStateBadge({
    state,
    noBg
}: {
    state: ApartmentState;
    noBg?: boolean;
}) {
    const getChipColor = (): ExtendedCustomColors => {
        switch (state) {
            case ApartmentState.READY:
                return 'success';
            case ApartmentState.OCCUPIED:
                return 'warning';
            case ApartmentState.USED:
                return 'error';
            default:
                return 'success';
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
