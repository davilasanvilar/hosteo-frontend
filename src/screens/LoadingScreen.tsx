import { Layout } from '../components/organism/Layout';
import logo from '/logo.svg';

export function LoadingScreen() {
    return (
        <Layout isPublic={true}>
            <div className="flex flex-col m-auto items-center gap-4 h-[200px] justify-center ">
                <img
                    src={logo}
                    alt="Logo"
                    className="mb-10 self-center  w-[200px]"
                />
                <h2 className="animate-loadingPulse">{'Loading...'}</h2>
            </div>
        </Layout>
    );
}
