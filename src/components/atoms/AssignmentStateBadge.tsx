import { Badge } from '@mantine/core';
import { AssignmentState } from '../../types/enums';
import { ExtendedCustomColors } from '../../mantine';

export function AssignmentStateBadge({
    state,
    noBg
}: {
    state: AssignmentState;
    noBg?: boolean;
}) {
    const getChipColor = (): ExtendedCustomColors => {
        switch (state) {
            case AssignmentState.FINISHED:
                return 'success';
            case AssignmentState.PENDING:
                return 'warning';
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
