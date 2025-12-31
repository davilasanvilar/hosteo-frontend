import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/organism/layout/Layout';

export function HomeScreen() {
    const { user, logout } = useAuth();
    return (
        <Layout>
            <p>{user?.id}</p>
            <h1>{`HELLO, ${user?.username}`}</h1>
            <button onClick={() => logout()}>{"LOGOUT"}</button>
        </Layout>
    );
}
