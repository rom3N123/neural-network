import { HomePage } from './home';
import { createRoutesView } from 'atomic-router-react';
import { TrainPage } from './train';
import { ModelsPage } from './models';
import { ModelPage } from './model';

export const Routing = createRoutesView({
    routes: [
        {
            route: HomePage.route,
            view: HomePage.view,
        },
        {
            route: TrainPage.route,
            view: TrainPage.view,
        },
        {
            route: ModelsPage.route,
            view: ModelsPage.view,
        },
        {
            route: ModelPage.route,
            view: ModelPage.view,
        },
    ],
});
