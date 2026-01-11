import { Button, Select, TextInput } from '@mantine/core';
import { Apartment } from '../../types/entities';
import { useEffect, useState } from 'react';
import { notEmptyValidator, useValidator } from '../../hooks/useValidator';
import {
    ApartmentFormFields,
    apartmentToForm,
    formFieldsToCreateApartmentForm,
    formFieldsToUpdateApartmentForm
} from '../../types/forms';
import { useCrud } from '../../hooks/useCrud';
import { useMutation } from '@tanstack/react-query';
import { showNotificationSuccess } from '../../utils/notifUtils';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useError } from '../../hooks/useError';
import { ApartmentState } from '../../types/enums';
import { ApartmentStateBadge } from '../atoms/ApartmentStateBadge';
import { useScreen } from '../../hooks/useScreen';
import { ModalButtons } from '../molecules/ModalButtons';

export function ApartmentForm({
    onClose,
    entity: apartment
}: {
    onClose?: () => void;
    entity?: Apartment;
}) {
    const { queryClient } = useReactQuery();
    const { handleError } = useError();
    const [formFields, setFormFields] = useState<ApartmentFormFields>(
        apartmentToForm(apartment)
    );

    useEffect(() => {
        if (apartment) {
            setFormFields(apartmentToForm(apartment));
        }
    }, [apartment]);

    const [nameDirty, nameError, nameMessage, nameValidate, setDirtyName] =
        useValidator(formFields.name, [notEmptyValidator]);

    const { create, update } = useCrud<Apartment>('apartment');

    const { isTablet } = useScreen();

    const createApartment = async () => {
        await create(formFieldsToCreateApartmentForm(formFields));
    };

    const { mutate: createApartmentMutation, isPending: isLoadingCreate } =
        useMutation({
            mutationFn: createApartment,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['apartments']
                });
                showNotificationSuccess('Apartment created');
                onClose?.();
            },
            onError: (e) => handleError(e)
        });

    const updateApartment = async () => {
        await update(formFieldsToUpdateApartmentForm(formFields));
    };

    const { mutate: updateApartmentMutation, isPending: isLoadingUpdate } =
        useMutation({
            mutationFn: updateApartment,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['apartments']
                });
                showNotificationSuccess('Apartment updated');
                onClose?.();
            },
            onError: (e) => handleError(e)
        });

    const onSubmit = () => {
        if (!nameValidate()) return;

        if (apartment) {
            updateApartmentMutation();
        } else {
            createApartmentMutation();
        }
    };

    const disabledButton = isLoadingCreate || isLoadingUpdate || nameError;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div style={{ display: 'flex', gap: '1rem' }}>
                <TextInput
                    label="Name"
                    variant="filled"
                    value={formFields.name}
                    onBlur={() => setDirtyName()}
                    onChange={(e) =>
                        setFormFields({
                            ...formFields,
                            name: e.target.value
                        })
                    }
                    withAsterisk
                    error={nameError && nameDirty ? nameMessage : undefined}
                />

                {apartment && (
                    <Select
                        style={{ maxWidth: '8rem' }}
                        label="State"
                        variant="filled"
                        value={formFields.state}
                        renderOption={(option) => (
                            <ApartmentStateBadge
                                state={option.option.value as ApartmentState}
                            />
                        )}
                        onChange={(value) =>
                            setFormFields({
                                ...formFields,
                                state: value as ApartmentState
                            })
                        }
                        data={Object.values(ApartmentState)}
                    />
                )}
            </div>

            <TextInput
                label="Airbnb ID"
                variant="filled"
                value={formFields.airbnbId}
                onChange={(e) =>
                    setFormFields({
                        ...formFields,
                        airbnbId: e.target.value
                    })
                }
            />
            <TextInput
                label="Booking ID"
                variant="filled"
                value={formFields.bookingId}
                onChange={(e) =>
                    setFormFields({
                        ...formFields,
                        bookingId: e.target.value
                    })
                }
            />
            <TextInput
                label="Street"
                variant="filled"
                value={formFields.street}
                onChange={(e) =>
                    setFormFields({
                        ...formFields,
                        street: e.target.value
                    })
                }
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
                <TextInput
                    w={isTablet ? '20%' : '30%'}
                    label="Zip code"
                    variant="filled"
                    value={formFields.zipCode}
                    onChange={(e) =>
                        setFormFields({
                            ...formFields,
                            zipCode: e.target.value
                        })
                    }
                />
                <TextInput
                    w={isTablet ? '40%' : '70%'}
                    label="City"
                    variant="filled"
                    value={formFields.city}
                    onChange={(e) =>
                        setFormFields({
                            ...formFields,
                            city: e.target.value
                        })
                    }
                />
                {isTablet && (
                    <TextInput
                        w={'40%'}
                        label="Country"
                        variant="filled"
                        value={formFields.country}
                        onChange={(e) =>
                            setFormFields({
                                ...formFields,
                                country: e.target.value
                            })
                        }
                    />
                )}
            </div>
            {!isTablet && (
                <TextInput
                    w={'100%'}
                    label="Country"
                    variant="filled"
                    value={formFields.country}
                    onChange={(e) =>
                        setFormFields({
                            ...formFields,
                            country: e.target.value
                        })
                    }
                />
            )}
            <ModalButtons>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    disabled={disabledButton}
                    type="submit"
                    loading={isLoadingCreate || isLoadingUpdate}
                >
                    {apartment ? 'Update' : 'Create'}
                </Button>
            </ModalButtons>
        </form>
    );
}
