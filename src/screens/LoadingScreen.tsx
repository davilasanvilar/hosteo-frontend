import { Loader } from '@mantine/core';
import { Layout } from '../components/organism/layout/Layout';
import logo from '/logo.svg';

export function LoadingScreen() {
    return (
        <Layout isPublic={true}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2rem'
                }}
            >
                <img style={{ width: '250px' }} src={logo} alt="Logo" />
                <Loader size="lg" />
            </div>
        </Layout>
    );
}
