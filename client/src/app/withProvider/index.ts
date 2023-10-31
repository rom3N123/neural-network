import compose from 'compose-function';
import { withMantine } from './withMantine';
import { withRouter } from './withRouter';
import { createRouter } from 'shared/config';

const router = createRouter();

export const withProvider = compose(withMantine, withRouter(router));
