import {
    Button,
    Group,
    NumberInput,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput
} from '@mantine/core';
import { Template } from '../../types/entities';
import { useEffect, useState } from 'react';
import { IconAlertTriangle, IconPlus } from '@tabler/icons-react';
import { useConfirmModal } from '../../hooks/useConfirmModal';
import { useError } from '../../hooks/useError';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useCrud } from '../../hooks/useCrud';
import { useMutation } from '@tanstack/react-query';
import { showNotificationSuccess } from '../../utils/notifUtils';
import { ModalButtons } from '../molecules/ModalButtons';
import { notEmptyValidator, useValidator } from '../../hooks/useValidator';
import { CardControls } from '../atoms/CardControls';
import {
    TemplateFormFields,
    formFieldsToCreateTemplateForm,
    formFieldsToUpdateTemplateForm,
    templateToForm
} from '../../types/forms';
import { CategoryEnum } from '../../types/enums';
import { TaskStep } from '../atoms/TaskStep';

export function TemplateForm({
    onClose,
    entity: template
}: {
    onClose?: () => void;
    entity?: Template;
}) {
    const { openModal } = useConfirmModal();
    const { handleError } = useError();
    const { queryClient } = useReactQuery();
    const { create, update } = useCrud<Template>('template');

    const [formFields, setFormFields] = useState<TemplateFormFields>(
        templateToForm(template)
    );

    // Additional state for steps management
    const [editingStepIndex, setEditingStepIndex] = useState<number | null>(
        null
    );
    const [editingStepValue, setEditingStepValue] = useState<string>('');
    const [newStepValue, setNewStepValue] = useState<string>('');

    useEffect(() => {
        if (template) {
            setFormFields(templateToForm(template));
        }
    }, [template]);

    const [nameDirty, nameError, nameMessage, nameValidate, setDirtyName] =
        useValidator(formFields.name, [notEmptyValidator]);

    const createTemplate = async () => {
        await create(formFieldsToCreateTemplateForm(formFields));
    };

    const { mutate: createTemplateMutation, isPending: isLoadingCreate } =
        useMutation({
            mutationFn: createTemplate,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['templates']
                });
                showNotificationSuccess('Template created');
                onClose?.();
            },
            onError: (e) => handleError(e)
        });

    const updateTemplate = async () => {
        if (!template) return;
        await update(formFieldsToUpdateTemplateForm(formFields));
    };

    const { mutate: updateTemplateMutation, isPending: isLoadingUpdate } =
        useMutation({
            mutationFn: updateTemplate,
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['templates']
                });
                showNotificationSuccess('Template updated');
                onClose?.();
            },
            onError: (e) => handleError(e)
        });

    const onSubmit = () => {
        if (!nameValidate()) return;

        if (template) {
            updateTemplateMutation();
        } else {
            createTemplateMutation();
        }
    };

    // Handle adding a new step
    const handleAddStep = () => {
        if (!newStepValue.trim()) return;
        setFormFields({
            ...formFields,
            steps: [...formFields.steps, newStepValue]
        });
        setNewStepValue('');
    };

    // Handle delete step with confirmation
    const handleDeleteStep = (index: number) => {
        openModal({
            title: (
                <Group gap="xs">
                    <IconAlertTriangle
                        color="var(--mantine-color-red-6)"
                        size={20}
                    />
                    <Text fw={700}>Confirm Deletion</Text>
                </Group>
            ),
            message: (
                <Text size="sm">
                    Are you sure you want to delete this step?
                </Text>
            ),
            color: 'red',
            onConfirm: () => {
                const newSteps = formFields.steps.filter((_, i) => i !== index);
                setFormFields({
                    ...formFields,
                    steps: newSteps
                });
            }
        });
    };

    // Start editing a step
    const startEditingKey = (index: number, value: string) => {
        setEditingStepIndex(index);
        setEditingStepValue(value);
    };

    // Save edited step
    const saveEditedStep = () => {
        if (editingStepIndex !== null && editingStepValue.trim()) {
            const newSteps = [...formFields.steps];
            newSteps[editingStepIndex] = editingStepValue;
            setFormFields({
                ...formFields,
                steps: newSteps
            });
            setEditingStepIndex(null);
            setEditingStepValue('');
        }
    };

    // Cancel edit
    const cancelEdit = () => {
        setEditingStepIndex(null);
        setEditingStepValue('');
    };

    const disabledButton = isLoadingCreate || isLoadingUpdate || nameError;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <Stack gap="lg">
                <TextInput
                    label="Name"
                    withAsterisk
                    value={formFields.name}
                    onBlur={() => setDirtyName()}
                    onChange={(e) =>
                        setFormFields({ ...formFields, name: e.target.value })
                    }
                    error={nameError && nameDirty ? nameMessage : undefined}
                />

                <Select
                    label="Category"
                    data={Object.values(CategoryEnum)}
                    value={formFields.category}
                    onChange={(value) =>
                        setFormFields({
                            ...formFields,
                            category: value as CategoryEnum
                        })
                    }
                    searchable
                />

                <NumberInput
                    label="Duration (minutes)"
                    value={formFields.duration}
                    onChange={(value) =>
                        setFormFields({
                            ...formFields,
                            duration: Number(value)
                        })
                    }
                    min={0}
                />

                <Stack gap="xs">
                    <Text size="sm" fw={500}>
                        Steps
                    </Text>
                    {formFields.steps.length === 0 && (
                        <Text c="dimmed" size="sm" fs="italic">
                            No steps added yet.
                        </Text>
                    )}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        {formFields.steps.map((step, index) => (
                            <TaskStep
                                key={index}
                                index={index}
                                value={step}
                                onEdit={(index, value) => {
                                    setFormFields((oldValue) => {
                                        const newVal = [...oldValue.steps];
                                        newVal[index] = value;
                                        return {
                                            ...oldValue,
                                            steps: newVal
                                        };
                                    });
                                }}
                                onDelete={(index) => {
                                    const newVal = [...formFields.steps];
                                    newVal.splice(index, 1);
                                    setFormFields({
                                        ...formFields,
                                        steps: newVal
                                    });
                                }}
                            />
                        ))}
                    </div>

                    <Group align="flex-start" mt="md">
                        <Textarea
                            placeholder="Add a new step..."
                            value={newStepValue}
                            onChange={(e) =>
                                setNewStepValue(e.currentTarget.value)
                            }
                            autosize
                            minRows={1}
                            style={{ flex: 1 }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddStep();
                                }
                            }}
                        />
                        <Button
                            variant="light"
                            onClick={handleAddStep}
                            leftSection={<IconPlus />}
                            disabled={!newStepValue.trim()}
                        >
                            Add
                        </Button>
                    </Group>
                </Stack>

                <ModalButtons>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        disabled={disabledButton}
                        type="submit"
                        loading={isLoadingCreate || isLoadingUpdate}
                    >
                        {template ? 'Update' : 'Create'}
                    </Button>
                </ModalButtons>
            </Stack>
        </form>
    );
}
