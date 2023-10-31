import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { ReactNode } from 'react';

export const withRouter =
    (router: ReturnType<typeof createHistoryRouter>) =>
    (component: () => ReactNode) =>
    () => {
        return <RouterProvider router={router}>{component()}</RouterProvider>;
    };
