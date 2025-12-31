import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import logo from '/logo.svg';
import styles from './Layout.module.css';
import { Button, Title } from '@mantine/core';
import { useScreen } from '../../../hooks/useScreen';

export function Layout({
    children,
    isPublic
}: {
    children: React.ReactNode;
    isPublic?: boolean;
}) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { isTablet } = useScreen();

    return isPublic || user ? (
        //Public Layout
        isPublic ? (
            <main className={styles.publicMain}>{children}</main>
        ) : (
            //Private layout
            <main className={styles.privateMain}>{children}</main>
        )
    ) : (
        //Not logged in layout
        <div className={styles.notLoggedInWrapper}>
            <main className={styles.notLoggedInMain}>
                <img src={logo} alt="Web logo" className={styles.logo} />
                <Title component={'h3'} order={3}>
                    {'You need an account to view this page'}
                </Title>
                <Button
                    size={isTablet ? 'lg' : 'sm'}
                    onClick={() => navigate('/login')}
                >
                    {'Sign in'}
                </Button>
            </main>
        </div>
    );
}
