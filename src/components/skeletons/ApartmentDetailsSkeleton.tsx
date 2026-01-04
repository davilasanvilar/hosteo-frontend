import { Skeleton } from '@mantine/core';
import { useScreen } from '../../hooks/useScreen';

export function ApartmentDetailsSkeleton() {
    const { isTablet } = useScreen();

    return (
        <div
            style={{
                display: 'flex',
                gap: '1rem',
                flexDirection: isTablet ? 'row' : 'column'
            }}
        >
            <Skeleton
                height={120}
                width={isTablet ? 500 : '100%'}
                radius="md"
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    width: '100%'
                }}
            >
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton height={24} width={24} circle mb="0.25rem" />
                        <Skeleton height={16} width={100} ml="0.25rem" />
                    </div>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton height={24} width={24} circle mb="0.25rem" />
                        <Skeleton height={16} width={100} ml="0.25rem" />
                    </div>
                </div>
                <Skeleton height={16} width={200} />
            </div>
        </div>
    );
}
