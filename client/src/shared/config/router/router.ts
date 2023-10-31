import { routes } from './routes';

export const router = [
    { path: '/', route: routes.home },
    { path: '/train', route: routes.train },
    { path: '/models', route: routes.models },
    { path: '/models/:modelId', route: routes.model },
];
