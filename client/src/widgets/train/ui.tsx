import { useUnit } from 'effector-react';
import ReactFlow from 'reactflow';
import styles from './ui.module.scss';
import { Item } from './Item/Item';
import { TrainItem } from './trainItem';
import { ResultItem } from './resultItem';
import { NameItem } from './nameItem';
import { $edges, $nodes } from './model';
import { CreateItem } from './createItem';

const nodeTypes = {
    item: Item,
    train: TrainItem,
    result: ResultItem,
    name: NameItem,
    create: CreateItem,
};

export const TrainConfiguration = () => {
    const nodes = useUnit($nodes);
    const edges = useUnit($edges);

    return (
        <div style={{ height: '100%' }}>
            <ReactFlow
                zoomOnDoubleClick={false}
                fitView
                className={styles.flow}
                nodes={nodes}
                edgesFocusable={false}
                nodeTypes={nodeTypes}
                edges={edges}
            />
        </div>
    );
};
