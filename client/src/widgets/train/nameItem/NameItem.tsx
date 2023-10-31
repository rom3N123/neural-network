import { Box, Input, InputProps, TextInput } from '@mantine/core';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { $theme } from 'shared/ui/ChangeThemeButton/effector';
import styles from './NameItem.module.scss';
import { Handle, Position } from 'reactflow';
import { $modelName, setModelName } from '../model';
import { ChangeEventHandler } from 'react';

export const NameItem = () => {
    const theme = useUnit($theme);
    const modelName = useUnit($modelName);

    const onChange: ChangeEventHandler<HTMLInputElement> = ({
        currentTarget: { value },
    }) => {
        setModelName(value);
    };

    return (
        <>
            <Handle position={Position.Right} type="source" />
            <Box p="sm" className={clsx(styles.box, styles[`box_${theme}`])}>
                <Input.Wrapper label="Название модели:">
                    <TextInput
                        error={!modelName ? 'Введите название модели' : ''}
                        required
                        type="text"
                        value={modelName}
                        onChange={onChange}
                    />
                </Input.Wrapper>
            </Box>
        </>
    );
};
