import { WorkerState } from '../../types/enums';
import { Badge } from '@mantine/core';
import { ExtendedCustomColors } from '../../mantine';

export function WorkerStateBadge({
    state,
    noBg
}: {
    state: WorkerState;
    noBg?: boolean;
}) {
    const getChipColor = (): ExtendedCustomColors => {
        switch (state) {
            case WorkerState.AVAILABLE:
                return 'success';
            case WorkerState.AWAY:
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
