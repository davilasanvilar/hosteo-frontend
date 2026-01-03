import React from 'react';
import { useScreen } from '../../hooks/useScreen';

export function ModalButtons({ children }: { children: React.ReactNode }) {
    const { isTablet } = useScreen();
    return (
        <div
            style={{
                marginTop: isTablet ? '1rem' : 'auto',
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                flexDirection: isTablet ? 'row' : 'column',
                gap: '1rem'
            }}
        >
            {children}
        </div>
    );
}
