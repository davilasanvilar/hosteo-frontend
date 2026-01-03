import { Button, Modal } from '@mantine/core';

export function FiltersModal({
    opened,
    onClose,
    title,
    children
}: {
    opened: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <Modal opened={opened} onClose={onClose} title={title}>
            <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                {children}
            </div>
            <Button variant="outline" onClick={onClose}>
                Close
            </Button>
        </Modal>
    );
}
