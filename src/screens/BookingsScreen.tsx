import {
    Button,
    MultiSelect,
    Switch,
    TextInput,
    Title,
    Text
} from '@mantine/core';
import { Layout } from '../components/organism/layout/Layout';
import { BookingForm } from '../components/modals/BookingForm';
import { useEffect, useState } from 'react';
import {
    IconAlertTriangle,
    IconLayoutGrid,
    IconLayoutList,
    IconPlus,
    IconSearch
} from '@tabler/icons-react';
import { useCrud } from '../hooks/useCrud';
import { Booking } from '../types/entities';
import { Page, TableStructure } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { BookingStateBadge } from '../components/atoms/BookingStateBadge';
import { ApartmentStateBadge } from '../components/atoms/ApartmentStateBadge';
import { BookingCard } from '../components/molecules/BookingCard';
import { useError } from '../hooks/useError';
import { BookingState } from '../types/enums';
import { DataTable } from '../components/organism/DataTable';
import { ApartmentCardSkeleton } from '../components/molecules/ApartmentCardSkeleton';
import { BookingFormSkeleton } from '../components/skeletons/BookingFormSkeleton';
import { BookingDetailsSkeleton } from '../components/skeletons/BookingDetailsSkeleton';
import { useScreen } from '../hooks/useScreen';
import { TopControls } from '../components/molecules/TopControls';
import { useConfirmModal } from '../hooks/useConfirmModal';
import { useEntityModal } from '../components/molecules/EntityModal';
import { DatePickerInput, DateTimePicker } from '@mantine/dates';
import dayjs from 'dayjs';
import { conf } from '../../conf';
import { PlatformIcon } from '../components/atoms/PlatformIcon';
import { BookingDetails } from '../components/modals/BookingDetails';
import { BookingCardSkeleton } from '../components/molecules/BookingCardSkeleton';

const tableStructure: TableStructure<Booking> = {
    headers: [
        'Apartment',
        'Source',
        'Start date',
        'End date',
        'Name',
        'Status',
        'Ap. status'
    ],
    accesorMethods: [
        (booking: Booking) => booking.apartment.name,
        (booking: Booking) => (
            <PlatformIcon platform={booking.source} size={20} />
        ),
        (booking: Booking) =>
            dayjs.unix(booking.startDate).format(conf.dateTimeFormat),
        (booking: Booking) =>
            dayjs.unix(booking.endDate).format(conf.dateTimeFormat),
        (booking: Booking) => booking.name,
        (booking: Booking) => <BookingStateBadge state={booking.state} />,
        (booking: Booking) => (
            <ApartmentStateBadge state={booking.apartment.state} />
        )
    ]
};

export function BookingsScreen() {
    const { search, remove } = useCrud<Booking>('booking');
    const { handleError } = useError();
    const { isTablet } = useScreen();
    const { openModal } = useConfirmModal();

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [apartmentSearch, setApartmentSearch] = useState<string>('');
    const [debouncedApartmentSearch, setDebouncedApartmentSearch] =
        useState<string>('');
    const [stateSearch, setStateSearch] = useState<string[]>([]);
    const [fromDate, setFromDate] = useState<string | null>(null);
    const [toDate, setToDate] = useState<string | null>(null);

    const [cardViewMode, setCardViewMode] = useState<boolean>(true);

    const {
        data: bookingPage,
        refetch: reloadBookings,
        isLoading,
        isError,
        error
    } = useQuery<Page<Booking>>({
        queryKey: [
            'bookings',
            pageNumber,
            debouncedApartmentSearch,
            stateSearch,
            fromDate,
            toDate
        ],
        queryFn: () =>
            search(pageNumber - 1, 15, {
                apartmentName: debouncedApartmentSearch,
                states: stateSearch.length > 0 ? stateSearch : undefined,
                startDate: fromDate
                    ? dayjs(fromDate).unix().toString()
                    : undefined,
                endDate: toDate ? dayjs(toDate).unix().toString() : undefined
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

    const { onOpen: onOpenFormModal, modalComponent: bookingFormModal } =
        useEntityModal<Booking>({
            entityName: 'booking',
            queryKey: 'bookingToEdit',
            removeHeader: true,
            ModalBodyComponent: BookingForm,
            ModalBodySkeleton: BookingFormSkeleton
        });

    const { onOpen: onOpenDetailsModal, modalComponent: bookingDetailsModal } =
        useEntityModal<Booking>({
            entityName: 'booking',
            queryKey: 'bookingToView',
            title: (booking: Booking | undefined) => {
                if (!booking) return '';
                return (
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center'
                        }}
                    >
                        <Title order={4}>{booking.name}</Title>
                        <BookingStateBadge state={booking.state} />
                    </div>
                );
            },
            ModalBodyComponent: BookingDetails,
            ModalBodySkeleton: BookingDetailsSkeleton
        });

    useEffect(() => {
        const timer = setTimeout(
            () => setDebouncedApartmentSearch(apartmentSearch),
            500
        );
        return () => clearTimeout(timer);
    }, [apartmentSearch]);

    const onDeleteBooking = async (id: string) => {
        await remove(id);
        reloadBookings();
    };

    const openDeleteModal = (id: string) =>
        openModal({
            title: (
                <>
                    <IconAlertTriangle color="error" size={16} />
                    <Text>Delete booking</Text>
                </>
            ),
            message: (
                <Text size="sm">
                    Deleting this booking will remove it permanently.
                </Text>
            ),
            color: 'error',
            onConfirm: () => onDeleteBooking(id)
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
                        value={apartmentSearch}
                        placeholder={
                            isTablet ? undefined : 'Search by apartment'
                        }
                        onChange={(e) => {
                            setPageNumber(1);
                            setApartmentSearch(e.target.value);
                        }}
                        leftSection={<IconSearch size={14} />}
                        label={isTablet ? 'Search by apartment' : undefined}
                    />
                }
                filters={
                    <>
                        <MultiSelect
                            variant="outlined"
                            value={stateSearch}
                            onChange={(e) => {
                                setPageNumber(1);
                                setStateSearch(e);
                            }}
                            style={{
                                minWidth: isTablet ? '8rem' : 'auto',
                                width: isTablet ? 'auto' : '100%    '
                            }}
                            hidePickedOptions
                            label="State"
                            data={Object.values(BookingState)}
                            renderOption={(state) => (
                                <BookingStateBadge
                                    state={state.option.value as BookingState}
                                    noBg
                                />
                            )}
                        />
                        <div
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                width: isTablet ? 'auto' : '100%'
                            }}
                        >
                            <DatePickerInput
                                value={fromDate}
                                valueFormat={conf.dateFormat}
                                style={{ width: isTablet ? '8rem' : '100%' }}
                                onChange={(val) => {
                                    setPageNumber(1);
                                    setFromDate(val);
                                }}
                                placeholder="From date"
                                label="From"
                                clearable
                            />
                            <DatePickerInput
                                value={toDate}
                                valueFormat={conf.dateFormat}
                                style={{ width: isTablet ? '8rem' : '100%' }}
                                onChange={setToDate}
                                placeholder="To date"
                                label="To"
                                clearable
                            />
                        </div>
                    </>
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
                        onClick={() => onOpenFormModal()}
                    >
                        {'Add booking'}
                    </Button>
                }
                filtersOnModalActivated={
                    stateSearch.length > 0 || !!fromDate || !!toDate
                }
            />
            <DataTable
                cardViewMode={cardViewMode}
                CardComponent={BookingCard}
                SkeletonComponent={BookingCardSkeleton}
                tableStructure={tableStructure}
                isLoading={isLoading}
                page={bookingPage!}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                onClick={onOpenDetailsModal}
                onEdit={onOpenFormModal}
                onDelete={openDeleteModal}
                cardMinWidth="15rem"
            />
            {bookingFormModal}
            {bookingDetailsModal}
        </Layout>
    );
}
