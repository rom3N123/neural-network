import { Layout } from 'shared/ui/Layout';
import { ModelsList } from 'widgets/models';
import { Navbar } from 'widgets/navbar';

export const View = () => {
    return (
        <Layout navbarSlot={<Navbar modelsActive />}>
            <ModelsList />
        </Layout>
    );
};
