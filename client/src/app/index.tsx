import { withProvider } from './withProvider';
import { Routing } from 'pages';
import '@mantine/core/styles.css';
import { useEffect, useState } from 'react';

const App = () => {
    const [canRender, setCanRender] = useState(false);

    return <Routing />;
};

export default withProvider(App);
