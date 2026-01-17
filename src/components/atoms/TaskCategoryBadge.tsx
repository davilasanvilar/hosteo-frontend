import { CategoryEnum } from '../../types/enums';
import { Badge } from '@mantine/core';

export function TaskCategoryBadge({ category }: { category: CategoryEnum }) {
    return (
        <Badge
            style={{ overflow: 'visible' }}
            variant="light"
            size="md"
            color={'primary'}
        >
            {category}
        </Badge>
    );
}
