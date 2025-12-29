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
const LazyValidateAccountScreen = lazy(() =>
    import('./screens/ValidateAccountScreen').then((module) => ({
        default: module.ValidateAccountScreen
    }))
);

const LazyForgottenPasswordScreen = lazy(() =>
    import('./screens/ForgottenPasswordScreen').then((module) => ({
        default: module.ForgottenPasswordScreen
    }))
);

const LazyResetPasswordScreen = lazy(() =>
    import('./screens/ResetPasswordScreen').then((module) => ({
        default: module.ResetPasswordScreen
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
        <div className="w-full h-full relative ">
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
                                <Route
                                    path="/validate/:username/:code"
                                    element={
                                        <Suspense fallback={<LoadingScreen />}>
                                            <LazyValidateAccountScreen />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/reset-password/:username/:code"
                                    element={
                                        <Suspense fallback={<LoadingScreen />}>
                                            <LazyResetPasswordScreen />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/recover-password"
                                    element={
                                        <Suspense fallback={<LoadingScreen />}>
                                            <LazyForgottenPasswordScreen />
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
