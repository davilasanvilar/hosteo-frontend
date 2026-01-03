import {
    ActionIcon,
    Button,
    MultiSelect,
    Pagination,
    Switch,
    Table,
    Text,
    TextInput
} from '@mantine/core';
import { Layout } from '../components/organism/layout/Layout';
import { ApartmentForm } from '../components/modals/ApartmentForm';
import { useEffect, useState } from 'react';
import {
    IconAlertTriangle,
    IconEdit,
    IconLayoutGrid,
    IconLayoutList,
    IconPlus,
    IconSearch,
    IconTrash
} from '@tabler/icons-react';
import { useCrud } from '../hooks/useCrud';
import { Apartment } from '../types/entities';
import { Page } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { addressToString } from '../utils/utilFunctions';
import { ApartmentStateBadge } from '../components/atoms/ApartmentStateBadge';
import { PlatformIcon } from '../components/atoms/PlatformIcon';
import { ApartmentCard } from '../components/molecules/ApartmentCard';
import { useError } from '../hooks/useError';
import { modals } from '@mantine/modals';
import { ApartmentState } from '../types/enums';
import styles from './ApartmentsScreen.module.css';
import { ApartmentDetails } from '../components/modals/ApartmentDetails';
import { useScreen } from '../hooks/useScreen';
import { TopControls } from '../components/molecules/TopControls';
import { useConfirmModal } from '../hooks/useConfirmModal';

export function ApartmentsScreen() {
    const [opened, setOpened] = useState(false);
    const { search, remove } = useCrud<Apartment>('apartment');
    const { handleError } = useError();
    const { isTablet } = useScreen();
    const { openModal } = useConfirmModal();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [debouncedNameSearch, setDebouncedNameSearch] = useState<string>('');
    const [stateSearch, setStateSearch] = useState<string[]>([]);
    const [cardViewMode, setCardViewMode] = useState<boolean>(false);
    const [apartmentToEditId, setApartmentToEditId] = useState<
        string | undefined
    >(undefined);
    const [apartmentDetailsOpenedId, setApartmentDetailsOpenedId] = useState<
        string | undefined
    >(undefined);

    const {
        data: apartmentPage,
        refetch: reloadApartments,
        isLoading,
        isError,
        error
    } = useQuery<Page<Apartment>>({
        queryKey: ['apartments', pageNumber, debouncedNameSearch, stateSearch],
        queryFn: () =>
            search(pageNumber - 1, 15, {
                name: debouncedNameSearch,
                states: stateSearch.length > 0 ? stateSearch : undefined
            }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false
    });

    const { get } = useCrud<Apartment>('apartment');

    const { data: apartmentToEdit } = useQuery({
        queryKey: ['apartment', apartmentToEditId],
        queryFn: () => (apartmentToEditId ? get(apartmentToEditId) : undefined),
        enabled: !!apartmentToEditId
    });

    useEffect(() => {
        if (apartmentToEdit) {
            setOpened(true);
        }
    }, [apartmentToEdit]);

    useEffect(() => {
        if (isError) {
            handleError(error);
        }
    }, [isError, error]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedNameSearch(nameSearch), 500);
        return () => clearTimeout(timer);
    }, [nameSearch]);

    const onDeleteApartment = async (id: string) => {
        await remove(id);
        reloadApartments();
    };

    const openDeleteModal = (id: string) =>
        openModal({
            title: (
                <>
                    <IconAlertTriangle color="error" size={16} />
                    <Text>Delete apartment</Text>
                </>
            ),
            message: (
                <Text size="sm">
                    Deleting this apartment will delete all the associated
                    information like bookings, assignments and tasks
                </Text>
            ),
            color: 'error',
            onConfirm: () => onDeleteApartment(id)
        });

    const printContent = () => {
        if (cardViewMode) {
            return (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fill, minmax(20rem,1fr))',
                        justifyItems: 'center',
                        gap: '1rem',
                        rowGap: '2rem'
                    }}
                >
                    {apartmentPage?.content.map((apartment) => (
                        <ApartmentCard
                            key={apartment.id}
                            apartment={apartment}
                            onClick={() =>
                                setApartmentDetailsOpenedId(apartment.id)
                            }
                            onDelete={() => openDeleteModal(apartment.id)}
                            onEdit={() => {
                                setApartmentToEditId(apartment.id);
                            }}
                        />
                    ))}
                </div>
            );
        } else {
            return (
                <Table style={{ width: '100%', overflowX: 'auto' }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>
                                <div
                                    style={{
                                        gap: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: 'max-content'
                                    }}
                                >
                                    <PlatformIcon platform={'airbnb'} />
                                    Airbnb ID
                                </div>
                            </Table.Th>
                            <Table.Th>
                                <div
                                    style={{
                                        gap: '0.25rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: 'max-content'
                                    }}
                                >
                                    <PlatformIcon platform={'booking'} />
                                    Booking ID
                                </div>
                            </Table.Th>
                            <Table.Th>State</Table.Th>
                            <Table.Th>Address</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {apartmentPage?.content.map((apartment) => (
                            <Table.Tr
                                key={apartment.id}
                                className={styles.selectableTr}
                                onClick={() => {
                                    setApartmentDetailsOpenedId(apartment.id);
                                }}
                            >
                                <Table.Td>{apartment.name}</Table.Td>
                                <Table.Td>{apartment.airbnbId}</Table.Td>
                                <Table.Td>{apartment.bookingId}</Table.Td>
                                <Table.Td>
                                    <ApartmentStateBadge
                                        state={apartment.state}
                                    />
                                </Table.Td>
                                <Table.Td>
                                    {addressToString(apartment.address)}
                                </Table.Td>
                                <Table.Td>
                                    <div
                                        style={{
                                            gap: '0.5rem',
                                            display: 'flex'
                                        }}
                                    >
                                        <ActionIcon
                                            variant="transparent"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setApartmentToEditId(
                                                    apartment.id
                                                );
                                            }}
                                        >
                                            <IconEdit />
                                        </ActionIcon>
                                        <ActionIcon
                                            variant="transparent"
                                            color="error"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openDeleteModal(apartment.id);
                                            }}
                                        >
                                            <IconTrash />
                                        </ActionIcon>
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            );
        }
    };

    return (
        <Layout>
            <TopControls
                searchNameComponent={
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
                stateSearchComponent={
                    <MultiSelect
                        variant="outlined"
                        value={stateSearch}
                        onChange={(e) => {
                            setPageNumber(1);
                            setStateSearch(e);
                        }}
                        style={{
                            minWidth: '8rem',
                            width: isTablet ? 'auto' : '100%'
                        }}
                        hidePickedOptions
                        label="State"
                        data={Object.values(ApartmentState)}
                        renderOption={(state) => (
                            <ApartmentStateBadge
                                state={state.option.value as ApartmentState}
                                noBg
                            />
                        )}
                    />
                }
                cardViewModeComponent={
                    <Switch
                        variant="filled"
                        onChange={() => setCardViewMode(!cardViewMode)}
                        checked={cardViewMode}
                        onLabel={<IconLayoutGrid size={16} color="white" />}
                        offLabel={<IconLayoutList size={16} color="white" />}
                    />
                }
                addButton={
                    <Button
                        leftSection={<IconPlus />}
                        onClick={() => setOpened(true)}
                    >
                        {'Add apartment'}
                    </Button>
                }
                filtersOnModalActivated={stateSearch.length > 0}
            />
            <section style={{ overflow: 'auto', height: '100%' }}>
                {printContent()}
            </section>
            {apartmentPage && (
                <Pagination
                    value={pageNumber}
                    onChange={setPageNumber}
                    total={apartmentPage?.totalPages}
                    gap={'1rem'}
                    style={{ alignSelf: 'center' }}
                />
            )}
            <ApartmentForm
                opened={opened}
                onClose={() => {
                    setOpened(false);
                    setApartmentToEditId(undefined);
                }}
                apartment={apartmentToEdit}
            />
            {apartmentDetailsOpenedId && (
                <ApartmentDetails
                    onClose={() => setApartmentDetailsOpenedId(undefined)}
                    apartmentId={apartmentDetailsOpenedId}
                />
            )}
        </Layout>
    );
}
