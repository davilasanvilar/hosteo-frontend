import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export function CardControls({
    onEdit,
    onDelete,
    flexDirection = 'row'
}: {
    onEdit?: () => void;
    onDelete?: () => void;
    flexDirection?: 'row' | 'column';
}) {
    return onEdit || onDelete ? (
        <div
            style={{
                gap: '0.5rem',
                display: 'flex',
                flexDirection: flexDirection
            }}
        >
            {onEdit && (
                <ActionIcon
                    variant="transparent"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                >
                    <IconEdit />
                </ActionIcon>
            )}
            {onDelete && (
                <ActionIcon
                    variant="transparent"
                    color="error"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <IconTrash />
                </ActionIcon>
            )}
        </div>
    ) : null;
}
