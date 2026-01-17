import { Skeleton, Stack } from '@mantine/core';

export function TemplateDetailsSkeleton() {
    return (
        <Stack gap="1rem">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '1rem'
                    }}
                >
                    <Skeleton
                        height="1.5rem"
                        width="1.5rem"
                        radius="100%"
                        style={{ flexShrink: 0 }}
                    />
                    <Skeleton height="1rem" width="100%" mt={4} />
                </div>
            ))}
        </Stack>
    );
}
