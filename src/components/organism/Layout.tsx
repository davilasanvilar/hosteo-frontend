import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '/logo.svg';

export function Layout({
    children,
    isPublic
}: {
    children: React.ReactNode;
    isPublic?: boolean;
}) {
    const { user } = useAuth();
    const navigate = useNavigate();

    return isPublic || user ? (
        //Public Layout
        isPublic ? (
            <main className="min-h-full flex-col md:h-auto md:min-h-full w-full p-4 flex h-screen backdrop-blur-sm items-center justify-center">
                {children}
            </main>
        ) : (
            //Private layout
            <>
                {/* <Menu /> */}
                <main
                    className={`w-full flex flex-col h-full max-w-[500px] m-auto p-8 gap-8`}
                >
                    {children}
                </main>
            </>
        )
    ) : (
        //Not logged in layout
        <div
            className={`min-h-full flex  flex-col items-center bg-center md:min-h-full h-screen w-full px-4 py-4`}
        >
            <main
                className={`flex p-8 rounded-lg h-full md:h-auto justify-center items-center py flex-col gap-6 m-auto`}
            >
                <img
                    src={logo}
                    alt="Web logo"
                    className="mb-10 self-center  w-[200px]"
                />
                <h2>{'You need an account to view this page'}</h2>
                <button onClick={() => navigate('/login')}>{'Sign in'}</button>
            </main>
        </div>
    );
}
