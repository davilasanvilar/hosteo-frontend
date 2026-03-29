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
import { Task, Template } from '../../types/entities';
import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useError } from '../../hooks/useError';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useCrud } from '../../hooks/useCrud';
import { useMutation } from '@tanstack/react-query';
import { showNotificationSuccess } from '../../utils/notifUtils';
import { ModalButtons } from '../molecules/ModalButtons';
import { notEmptyValidator, useValidator } from '../../hooks/useValidator';
import {
    TaskFormFields,
    TemplateFormFields,
    formFieldsToCreateTaskForm,
    formFieldsToCreateTemplateForm,
    formFieldsToUpdateTaskForm,
    formFieldsToUpdateTemplateForm,
    taskToForm,
    templateToForm
} from '../../types/forms';
import { CategoryEnum } from '../../types/enums';
import { TaskStep } from '../atoms/TaskStep';

export function TaskOrTemplateForm({
    onClose,
    entity,
    relatedEntityId: apartmentId
}: {
    onClose?: () => void;
    entity?: Template | Task;
    relatedEntityId?: string;
}) {
    const { handleError } = useError();
    const { queryClient } = useReactQuery();
    const { create: createTask, update: updateTask } = useCrud<Task>('task');
    const { create: createTemplate, update: updateTemplate } =
        useCrud<Template>('template');

    const [formFields, setFormFields] = useState<
        TemplateFormFields | TaskFormFields
    >(apartmentId ? taskToForm(entity as Task) : templateToForm(entity));

    const [newStepValue, setNewStepValue] = useState<string>('');

    useEffect(() => {
        setFormFields(
            apartmentId ? taskToForm(entity as Task) : templateToForm(entity)
        );
    }, [entity]);

    const [nameDirty, nameError, nameMessage, nameValidate, setDirtyName] =
        useValidator(formFields.name, [notEmptyValidator]);

    const createEntity = async () => {
        if (apartmentId) {
            await createTask(
                formFieldsToCreateTaskForm(
                    formFields as TaskFormFields,
                    apartmentId
                )
            );
        } else {
            await createTemplate(
                formFieldsToCreateTemplateForm(formFields as TemplateFormFields)
            );
        }
    };

    const { mutate: createEntityMutation, isPending: isLoadingCreate } =
        useMutation({
            mutationFn: createEntity,
            onSuccess: () => {
                if (apartmentId) {
                    queryClient.invalidateQueries({
                        queryKey: ['apartmentToEdit']
                    });
                } else {
                    queryClient.invalidateQueries({
                        queryKey: ['templates']
                    });
                }
                showNotificationSuccess(
                    `${apartmentId ? 'Task' : 'Template'} created`
                );
                onClose?.();
            },
            onError: (e) => handleError(e)
        });

    const updateEntity = async () => {
        if (!entity) return;
        if (!apartmentId) {
            await updateTemplate(
                formFieldsToUpdateTemplateForm(formFields as TemplateFormFields)
            );
        } else {
            await updateTask(
                formFieldsToUpdateTaskForm(formFields as TaskFormFields)
            );
        }
    };

    const { mutate: updateEntityMutation, isPending: isLoadingUpdate } =
        useMutation({
            mutationFn: updateEntity,
            onSuccess: () => {
                if (apartmentId) {
                    queryClient.invalidateQueries({
                        queryKey: ['apartmentToEdit']
                    });
                } else {
                    queryClient.invalidateQueries({
                        queryKey: ['templates']
                    });
                }
                showNotificationSuccess(
                    `${apartmentId ? 'Task' : 'Template'} updated`
                );
                onClose?.();
            },
            onError: (e) => handleError(e)
        });

    const onSubmit = () => {
        if (!nameValidate()) return;

        if (entity) {
            updateEntityMutation();
        } else {
            createEntityMutation();
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
                            gap: '1rem',
                            overflowY: 'auto',
                            padding: '0.25rem'
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
                    {entity ? 'Update' : 'Create'}
                </Button>
            </ModalButtons>
        </form>
    );
}
