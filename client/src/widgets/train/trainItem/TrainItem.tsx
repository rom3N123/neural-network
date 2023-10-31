import {
    Box,
    Button,
    Flex,
    Input,
    NumberInput,
    NumberInputProps,
    Popover,
    Tooltip,
} from '@mantine/core';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { $theme } from 'shared/ui/ChangeThemeButton/effector';
import styles from './TrainItem.module.scss';
import { Handle, Position } from 'reactflow';
import { $canTrain, $epochs, trainModelFx, updateEpochs } from '../model';
import { IconSettings } from '@tabler/icons-react';

export const TrainItem = () => {
    const theme = useUnit($theme);
    const canTrain = useUnit($canTrain);
    const epochs = useUnit($epochs);
    const isTraining = useUnit(trainModelFx.pending);

    const onEpochsChange: NumberInputProps['onChange'] = (epochs) => {
        updateEpochs(Number(epochs));
    };

    const disabled = !canTrain;

    const onTrainClick = () => {
        trainModelFx();
    };

    return (
        <>
            <Handle position={Position.Right} type="source" />
            <Handle position={Position.Left} type="target" />
            <Box className={clsx(styles.box, styles[`box_${theme}`])}>
                <Flex align="center" justify="center" p="sm">
                    <Tooltip
                        withArrow
                        position="bottom"
                        hidden={!disabled}
                        label="Добавьте изображения в каждый класс и введите имя модели"
                    >
                        <Button
                            loading={isTraining}
                            onClick={onTrainClick}
                            disabled={disabled}
                        >
                            Обучить модель
                        </Button>
                    </Tooltip>
                </Flex>

                <Popover width="target" withArrow closeOnClickOutside>
                    <Popover.Target>
                        <Button
                            disabled={disabled || isTraining}
                            p="xs"
                            w="100%"
                            variant="light"
                            rightSection={<IconSettings size={14} />}
                        >
                            Настройки
                        </Button>
                    </Popover.Target>

                    <Popover.Dropdown>
                        <Input.Wrapper label="Эпохи:">
                            <NumberInput
                                min={1}
                                hideControls
                                value={epochs}
                                onChange={onEpochsChange}
                            />
                        </Input.Wrapper>
                    </Popover.Dropdown>
                </Popover>
            </Box>
        </>
    );
};
