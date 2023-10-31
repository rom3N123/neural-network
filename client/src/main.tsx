import ReactDOM from 'react-dom/client';
import App from './app';
import 'reactflow/dist/style.css';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { ReactFlowProvider } from 'reactflow';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ReactFlowProvider>
        <App />
    </ReactFlowProvider>
);
