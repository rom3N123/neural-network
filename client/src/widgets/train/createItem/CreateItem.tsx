import { Handle, Position } from 'reactflow';
import { Button } from '@mantine/core';
import styles from './CreateItem.module.scss';
import { createClass } from 'entities/classess/model';

export const CreateItem = () => {
    return (
        <>
            <Handle position={Position.Left} type="target" />
            <Handle position={Position.Right} type="source" />

            <Button
                variant="outline"
                size="xs"
                onClick={() => createClass()}
                className={styles.button}
            >
                Добавить класс
            </Button>
        </>
    );
};
