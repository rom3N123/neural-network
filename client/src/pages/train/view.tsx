import { Layout } from 'shared/ui/Layout';
import { Navbar } from 'widgets/navbar';
import { TrainConfiguration } from 'widgets/train';

export const View = () => {
    return (
        <Layout navbarSlot={<Navbar trainImagesActive />}>
            <TrainConfiguration />
        </Layout>
    );
};
