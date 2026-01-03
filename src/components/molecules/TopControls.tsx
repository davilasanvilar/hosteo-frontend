import { ActionIcon, Indicator } from '@mantine/core';
import { useScreen } from '../../hooks/useScreen';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { FiltersModal } from '../modals/FiltersModal';

interface TopControlsProps {
    keywordFilter: React.ReactNode;
    filters: React.ReactNode;
    cardViewModeComponent: React.ReactNode;
    addButton: React.ReactNode;
    filtersOnModalActivated: boolean;
}

export function TopControls({
    keywordFilter,
    filters,
    cardViewModeComponent,
    addButton,
    filtersOnModalActivated
}: TopControlsProps) {
    const { isTablet } = useScreen();
    const [filtersOpened, setFiltersOpened] = useState(false);

    return isTablet ? (
        <section
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {keywordFilter}
                    {filters}
                </div>
                {addButton}
            </div>
            {cardViewModeComponent}
        </section>
    ) : (
        <section
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {cardViewModeComponent}
                {addButton}
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Indicator disabled={!filtersOnModalActivated}>
                    <ActionIcon
                        variant="light"
                        size="lg"
                        onClick={() => setFiltersOpened(true)}
                    >
                        <IconFilter />
                    </ActionIcon>
                </Indicator>
                {keywordFilter}
            </div>
            {!isTablet && filtersOpened && (
                <FiltersModal
                    opened={filtersOpened}
                    onClose={() => setFiltersOpened(false)}
                    title="Filters"
                >
                    {filters}
                </FiltersModal>
            )}
        </section>
    );
}
