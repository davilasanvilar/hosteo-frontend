import { Button, TextInput, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { IconAlertTriangle, IconPlus, IconSearch } from '@tabler/icons-react'; // Removed IconLayoutGrid, IconLayoutList as layout is fixed
import { useState, useEffect } from 'react';
import { Text } from '@mantine/core';

import { Layout } from '../components/organism/layout/Layout';
import { TopControls } from '../components/molecules/TopControls';
import { DataTable } from '../components/organism/DataTable';
import { TaskOrTemplateCard } from '../components/molecules/TaskOrTemplateCard';

import { useCrud } from '../hooks/useCrud';
import { useError } from '../hooks/useError';
import { useScreen } from '../hooks/useScreen';
import { useConfirmModal } from '../hooks/useConfirmModal';
import { useEntityModal } from '../components/molecules/EntityModal';
import { Template } from '../types/entities';
import { Page, TableStructure } from '../types/types';
import { TaskOrTemplateForm } from '../components/modals/TaskOrTemplateForm';
import { TaskOrTemplateFormSkeleton } from '../components/skeletons/TaskOrTemplateFormSkeleton';
import { TaskOrTemplateCardSkeleton } from '../components/molecules/TaskOrTemplateCardSkeleton';
import { userTaskOrTemplateDetailsModal } from '../components/organism/TaskOrTemplateDetailsModal';

const tableStructure: TableStructure<Template> = {
    headers: [],
    accesorMethods: []
};

export function TemplatesScreen() {
    const { search, remove } = useCrud<Template>('template'); // Entity name 'template'
    const { handleError } = useError();
    const { isTablet } = useScreen();
    const { openModal } = useConfirmModal();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [debouncedNameSearch, setDebouncedNameSearch] = useState<string>('');

    const {
        data: templatePage,
        refetch: reloadTemplates,
        isLoading,
        isError,
        error
    } = useQuery<Page<Template>>({
        queryKey: ['templates', pageNumber, debouncedNameSearch],
        queryFn: () =>
            search(pageNumber - 1, 15, {
                name: debouncedNameSearch
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false
    });

    useEffect(() => {
        if (isError) {
            handleError(error);
        }
    }, [isError, error]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedNameSearch(nameSearch), 500);
        return () => clearTimeout(timer);
    }, [nameSearch]);

    const { onOpen: onOpenFormModal, modalComponent: templateFormModal } =
        useEntityModal<Template>({
            entityName: 'template',
            queryKey: 'templateToEdit',
            ModalBodyComponent: TaskOrTemplateForm,
            ModalBodySkeleton: TaskOrTemplateFormSkeleton
        });

    const { onOpenDetailsModal, detailsModal } =
        userTaskOrTemplateDetailsModal('template');

    const onDeleteTemplate = async (id: string) => {
        await remove(id);
        reloadTemplates();
    };

    const openDeleteModal = (id: string) =>
        openModal({
            title: (
                <div
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}
                >
                    <IconAlertTriangle
                        color="var(--mantine-color-red-6)"
                        size={16}
                    />
                    <Text fw={700}>Delete template</Text>
                </div>
            ),
            message: (
                <Text size="sm">
                    Are you sure you want to delete this template? This action
                    cannot be undone.
                </Text>
            ),
            color: 'red',
            onConfirm: () => onDeleteTemplate(id)
        });

    return (
        <Layout>
            <TopControls
                keywordFilter={
                    <TextInput
                        variant="outlined"
                        style={{
                            width: isTablet ? '15rem' : '100%'
                        }}
                        value={nameSearch}
                        placeholder={isTablet ? undefined : 'Search by name'}
                        onChange={(e) => {
                            setPageNumber(1);
                            setNameSearch(e.target.value);
                        }}
                        leftSection={<IconSearch size={14} />}
                        label={isTablet ? 'Search by name' : undefined}
                    />
                }
                // Only filter is search by name
                filters={null}
                // Card view only, so no switch needed. Passing null or empty fragment.
                cardViewModeComponent={null}
                addButton={
                    <Button
                        leftSection={<IconPlus />}
                        onClick={() => onOpenFormModal()}
                    >
                        {'Add template'}
                    </Button>
                }
                filtersOnModalActivated={false}
            />
            <DataTable
                cardViewMode={true}
                CardComponent={TaskOrTemplateCard}
                SkeletonComponent={TaskOrTemplateCardSkeleton}
                tableStructure={tableStructure}
                isLoading={isLoading}
                page={templatePage!}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                onClick={onOpenDetailsModal}
                onEdit={onOpenFormModal}
                onDelete={openDeleteModal}
                cardMinWidth="15rem"
            />
            {templateFormModal}
            {detailsModal}
        </Layout>
    );
}
