import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LoginScreen } from './screens/LoginScreen';
import { Suspense, lazy, useEffect } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { LoadingScreen } from './screens/LoadingScreen';

const LazyRegisterScreen = lazy(() =>
    import('./screens/RegisterScreen').then((module) => ({
        default: module.RegisterScreen
    }))
);

function Body() {
    const authInfo = useAuth();

    const calculate1vh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    useEffect(() => {
        calculate1vh();
        window.addEventListener('resize', calculate1vh);
        return () => {
            window.removeEventListener('resize', calculate1vh);
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <BrowserRouter>
                {authInfo.isLoadingUserInfo === false ? (
                    <>
                        <Suspense fallback={<LoadingScreen />}>
                            <Routes>
                                <Route path="/" element={<HomeScreen />} />
                                <Route
                                    path="/login"
                                    element={<LoginScreen />}
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <Suspense fallback={<LoadingScreen />}>
                                            <LazyRegisterScreen />
                                        </Suspense>
                                    }
                                />
                            </Routes>
                        </Suspense>
                    </>
                ) : (
                    <LoadingScreen />
                )}
            </BrowserRouter>
        </div>
    );
}

export default Body;
