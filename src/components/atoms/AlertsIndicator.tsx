import { Text } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

function AlertElement({
    alertType,
    count
}: {
    alertType: 'red' | 'yellow';
    count: number;
}) {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
            }}
        >
            <IconAlertTriangle
                color={
                    alertType === 'red'
                        ? 'var(--mantine-color-error-5)'
                        : 'var(--mantine-color-yellow-6)'
                }
                size={32}
            />
            <Text size="xl" c={'var(--mantine-color-gray-9)'}>
                {count ?? 0}
            </Text>
        </div>
    );
}
export function AlertsIndicator({
    onClick,
    redAlertCount,
    yellowAlertCount
}: {
    onClick?: () => void;
    redAlertCount?: number;
    yellowAlertCount?: number;
}) {
    const containerStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'transparent',
        border: 'none',
        cursor: onClick ? 'pointer' : 'default'
    };

    const content = (
        <>
            <AlertElement alertType="red" count={redAlertCount ?? 0} />
            <AlertElement alertType="yellow" count={yellowAlertCount ?? 0} />
        </>
    );

    if (!redAlertCount && !yellowAlertCount) {
        return null;
    }
    return onClick ? (
        <button onClick={onClick} style={containerStyles}>
            {content}
        </button>
    ) : (
        <div style={containerStyles}>{content}</div>
    );
}
