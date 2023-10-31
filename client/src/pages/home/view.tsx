import { Navbar } from 'widgets/navbar';
import { Layout } from 'shared/ui/Layout';

export const View = () => {
    return <Layout navbarSlot={<Navbar />}>Home</Layout>;
};
