import { List, CloseButton, Loader, Text, Button } from '@mantine/core';
import styles from './ModelsList.module.scss';
import { Link } from 'atomic-router-react';
import { routes } from 'shared/config';
import { useUnit } from 'effector-react';
import { $isLoading, $models, deleteModelFx, fetchModelsFx } from '../model';
import { useEffect } from 'react';

export const ModelsList = () => {
    const models = useUnit($models);
    const isLoading = useUnit($isLoading);

    useEffect(() => {
        fetchModelsFx();
    }, []);

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Loader />
            </div>
        );
    }

    if (!models.length) {
        return <Text ta="center">Список моделей пуст</Text>;
    }

    return (
        <List className={styles.list}>
            {models.map(({ id, name }) => (
                <List.Item
                    key={id}
                    styles={{
                        itemLabel: {
                            width: '100%',
                        },
                    }}
                    w="100%"
                    className={styles.item}
                >
                    <Link
                        key={id}
                        style={{
                            textDecoration: 'none',
                            width: '100%',
                            color: 'inherit',
                        }}
                        to={routes.model}
                        params={{ modelId: id }}
                    >
                        <Button
                            justify="space-between"
                            w="100%"
                            variant="subtle"
                        >
                            <Text>{name}</Text>
                        </Button>
                    </Link>

                    <CloseButton
                        variant="transparent"
                        onClick={(event) => {
                            event.stopPropagation();
                            deleteModelFx({ modelId: id });
                        }}
                    />
                </List.Item>
            ))}
        </List>
    );
};
