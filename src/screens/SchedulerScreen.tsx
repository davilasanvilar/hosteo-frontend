import { Layout } from '../components/organism/layout/Layout';

import { Scheduler } from '../components/organism/Scheduler';

export function SchedulerScreen() {
    return (
        <Layout customStyles={{ maxWidth: '90rem' }}>
            <Scheduler />
        </Layout>
    );
}
