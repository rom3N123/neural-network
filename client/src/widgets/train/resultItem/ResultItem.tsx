import { Box, Button, Flex, NavLink, Text } from '@mantine/core';
import clsx from 'clsx';
import { useStore, useUnit } from 'effector-react';
import { $theme } from 'shared/ui/ChangeThemeButton/effector';
import styles from './ResultItem.module.scss';
import { Handle, Position } from 'reactflow';
import { IconLogin, IconRefresh } from '@tabler/icons-react';
import { $hasTrained, resetTrainConfig } from '../model';
import { Link } from 'atomic-router-react';
import { routes } from 'shared/config';

export const ResultItem = () => {
    const theme = useUnit($theme);
    const hasTrained = useStore($hasTrained);

    const onResetClick = () => {
        resetTrainConfig();
    };

    return (
        <>
            <Handle position={Position.Left} type="target" />
            <Box p="xs" className={clsx(styles.box, styles[`box_${theme}`])}>
                {!hasTrained && <Text ta="center">Сначала обучите модель</Text>}

                {Boolean(hasTrained) && (
                    <Flex direction="column" gap="xs">
                        <Link
                            style={{ textDecoration: 'none' }}
                            to={routes.models}
                        >
                            <Button
                                w="100%"
                                color="green"
                                rightSection={<IconLogin size={20} />}
                            >
                                Открыть
                            </Button>
                        </Link>

                        <Button
                            color="red"
                            onClick={onResetClick}
                            rightSection={<IconRefresh size={20} />}
                        >
                            Сбросить
                        </Button>
                    </Flex>
                )}
            </Box>
        </>
    );
};
