import { Layout } from 'shared/ui/Layout';
import { Navbar } from 'widgets/navbar';
import { StartModel } from 'widgets/start';

export const View = () => {
    return (
        <Layout navbarSlot={<Navbar modelsActive />}>
            <StartModel />
        </Layout>
    );
};
