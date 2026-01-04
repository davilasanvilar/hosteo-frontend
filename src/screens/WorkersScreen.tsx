import { Button, TextInput } from '@mantine/core';
import { Layout } from '../components/organism/layout/Layout';
import { useEffect, useState } from 'react';
import { IconAlertTriangle, IconPlus, IconSearch } from '@tabler/icons-react';
import { useCrud } from '../hooks/useCrud';
import { Worker } from '../types/entities';
import { Page } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { useError } from '../hooks/useError';
import { useScreen } from '../hooks/useScreen';
import { TopControls } from '../components/molecules/TopControls';
import { useConfirmModal } from '../hooks/useConfirmModal';
import { DataTable } from '../components/organism/DataTable';
import { WorkerCard } from '../components/molecules/WorkerCard';
import { WorkerCardSkeleton } from '../components/molecules/WorkerCardSkeleton';
import { WorkerForm } from '../components/modals/WorkerForm';
import { Text } from '@mantine/core';
import { useEntityModal } from '../components/molecules/EntityModal';
import { WorkerFormSkeleton } from '../components/skeletons/WorkerFormSkeleton';

export function WorkersScreen() {
    const { search, remove } = useCrud<Worker>('worker');
    const { handleError } = useError();
    const { isTablet } = useScreen();
    const { openModal } = useConfirmModal();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [debouncedNameSearch, setDebouncedNameSearch] = useState<string>('');

    const {
        data: workerPage,
        refetch: reloadWorkers,
        isLoading,
        isError,
        error
    } = useQuery<Page<Worker>>({
        queryKey: ['workers', pageNumber, debouncedNameSearch],
        queryFn: () =>
            search(pageNumber - 1, 15, {
                name: debouncedNameSearch
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false
    });

    const { onOpen, modalComponent: workerFormModal } = useEntityModal<Worker>({
        entityName: 'worker',
        queryKey: 'workerToEdit',
        ModalBodyComponent: WorkerForm,
        ModalBodySkeleton: WorkerFormSkeleton
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

    const onDeleteWorker = async (id: string) => {
        await remove(id);
        reloadWorkers();
    };

    const openDeleteModal = (id: string) =>
        openModal({
            title: (
                <>
                    <IconAlertTriangle color="error" size={16} />
                    <Text>Delete worker</Text>
                </>
            ),
            message: (
                <Text size="sm">
                    Deleting this worker will delete all the associated
                    information like assignments.
                </Text>
            ),
            color: 'error',
            onConfirm: () => onDeleteWorker(id)
        });

    return (
        <Layout>
            <TopControls
                keywordFilter={
                    <TextInput
                        variant="outlined"
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
                addButton={
                    <Button leftSection={<IconPlus />} onClick={() => onOpen()}>
                        {'Add worker'}
                    </Button>
                }
                filtersOnModalActivated={false}
            />
            <DataTable
                cardViewMode={true}
                CardComponent={WorkerCard}
                cardMinWidth="14rem"
                SkeletonComponent={WorkerCardSkeleton}
                tableStructure={{ accesorMethods: [], headers: [] }}
                isLoading={isLoading}
                page={workerPage!}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                onEdit={onOpen}
                onDelete={openDeleteModal}
            />
            {workerFormModal}
        </Layout>
    );
}
