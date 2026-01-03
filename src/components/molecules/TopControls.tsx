import { ActionIcon, Indicator } from '@mantine/core';
import { useScreen } from '../../hooks/useScreen';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import { FiltersModal } from '../modals/FiltersModal';

interface TopControlsProps {
    searchNameComponent: React.ReactNode;
    stateSearchComponent: React.ReactNode;
    cardViewModeComponent: React.ReactNode;
    addButton: React.ReactNode;
    filtersOnModalActivated: boolean;
}

export function TopControls({
    searchNameComponent,
    stateSearchComponent,
    cardViewModeComponent,
    addButton,
    filtersOnModalActivated
}: TopControlsProps) {
    const { isTablet } = useScreen();
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [filtersActive, setFiltersActive] = useState(false);

    return isTablet ? (
        <section
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {searchNameComponent}
                    {stateSearchComponent}
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
                {searchNameComponent}
            </div>
            {!isTablet && filtersOpened && (
                <FiltersModal
                    opened={filtersOpened}
                    onClose={() => setFiltersOpened(false)}
                    title="Filters"
                >
                    {stateSearchComponent}
                </FiltersModal>
            )}
        </section>
    );
}
