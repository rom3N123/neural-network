import { createHistoryRouter } from 'atomic-router';
import { router } from './router';
import { createBrowserHistory } from 'history';

export const createRouter = () => {
    const appRouter = createHistoryRouter({ routes: router });

    const history = createBrowserHistory();

    appRouter.setHistory(history);

    return appRouter;
};
