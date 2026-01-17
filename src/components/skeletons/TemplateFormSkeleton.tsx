import { Skeleton, Stack, Group } from '@mantine/core';
import { ModalButtons } from '../molecules/ModalButtons';

export function TemplateFormSkeleton() {
    return (
        <Stack gap="lg">
            <div>
                <Skeleton height={20} width={100} mb={8} /> {/* Label */}
                <Skeleton height={36} /> {/* Input */}
            </div>

            <Stack gap="xs">
                <Skeleton height={20} width={60} /> {/* Steps Label */}
                {/* Simulated Steps */}
                <Group
                    align="flex-start"
                    wrap="nowrap"
                    style={{
                        padding: '0.5rem',
                        border: '1px solid var(--mantine-color-gray-3)',
                        borderRadius: 'var(--mantine-radius-sm)'
                    }}
                >
                    <Skeleton height={20} width="80%" />
                </Group>
                <Group
                    align="flex-start"
                    wrap="nowrap"
                    style={{
                        padding: '0.5rem',
                        border: '1px solid var(--mantine-color-gray-3)',
                        borderRadius: 'var(--mantine-radius-sm)'
                    }}
                >
                    <Skeleton height={20} width="60%" />
                </Group>
                <Group align="flex-start" mt="md">
                    <Skeleton height={36} width="100%" />{' '}
                    {/* Add step textarea */}
                </Group>
            </Stack>

            <ModalButtons>
                <Skeleton height={36} width={80} />
                <Skeleton height={36} width={80} />
            </ModalButtons>
        </Stack>
    );
}
