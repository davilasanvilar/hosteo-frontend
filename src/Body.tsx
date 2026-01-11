import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginScreen } from './screens/LoginScreen';
import { Suspense, lazy } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { LoadingScreen } from './screens/LoadingScreen';

const LazyRegisterScreen = lazy(() =>
    import('./screens/RegisterScreen').then((module) => ({
        default: module.RegisterScreen
    }))
);

const LazyApartmentsScreen = lazy(() =>
    import('./screens/ApartmentsScreen').then((module) => ({
        default: module.ApartmentsScreen
    }))
);

const LazyWorkersScreen = lazy(() =>
    import('./screens/WorkersScreen').then((module) => ({
        default: module.WorkersScreen
    }))
);

const LazyBookingsScreen = lazy(() =>
    import('./screens/BookingsScreen').then((module) => ({
        default: module.BookingsScreen
    }))
);

function Body() {
    const authInfo = useAuth();

    return authInfo.isLoadingUserInfo === false ? (
        <div
            style={{
                width: '100vw',
                height: '100%',
                position: 'relative'
            }}
        >
            <Suspense fallback={<LoadingScreen />}>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route
                        path="/register"
                        element={
                            <Suspense fallback={<LoadingScreen />}>
                                <LazyRegisterScreen />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/apartments"
                        element={
                            <Suspense fallback={<LoadingScreen />}>
                                <LazyApartmentsScreen />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/workers"
                        element={
                            <Suspense fallback={<LoadingScreen />}>
                                <LazyWorkersScreen />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/bookings"
                        element={
                            <Suspense fallback={<LoadingScreen />}>
                                <LazyBookingsScreen />
                            </Suspense>
                        }
                    />
                </Routes>
            </Suspense>
        </div>
    ) : (
        <LoadingScreen />
    );
}

export default Body;
