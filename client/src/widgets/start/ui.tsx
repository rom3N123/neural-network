import { Box, Button, Flex, Image, Text, Title } from '@mantine/core';
import { useUnit } from 'effector-react';
import { useDropzone } from 'react-dropzone';
import { routes } from 'shared/config';
import { $models } from 'widgets/models/model';
import {
    $images,
    $results,
    resetImages,
    addImages,
    startModelFx,
    resetResults,
} from './model';
import { useEffect, useState } from 'react';
import styles from './ui.module.scss';
import { IconUpload } from '@tabler/icons-react';

export const StartModel = () => {
    const images = useUnit($images);
    const { modelId } = routes.model.$params.getState() as { modelId: string };
    const models = useUnit($models);
    const results = useUnit($results);
    const [urls, setUrls] = useState<string[]>([]);

    useEffect(() => {
        urls.forEach((url) => {
            URL.revokeObjectURL(url);
        });

        setUrls(() => images.map(URL.createObjectURL));
    }, [images]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'images/*': [],
        },
        onDropAccepted: (files: File[]) => {
            addImages(files);
        },
    });

    const model = models.find((model) => model.id === modelId);

    if (!model) {
        return <Text color="red">Модель не найдена</Text>;
    }

    return (
        <div>
            <Title>{model.name}</Title>

            <Box mb="md">
                <Flex direction="column" gap="sm">
                    {urls.map((src, index) => (
                        <Flex align="center" gap="sm" key={src}>
                            <div>
                                <Image w={100} h={100} fit="fill" src={src} />
                            </div>

                            {results[index] && (
                                <Text color="green" fw="bold">
                                    {results[index]}
                                </Text>
                            )}
                        </Flex>
                    ))}
                </Flex>
            </Box>

            <input {...getInputProps()} />
            <Flex gap="sm" align="center">
                <Button
                    {...getRootProps()}
                    className={styles.button}
                    variant="outline"
                >
                    <Flex
                        direction="column"
                        align="center"
                        justify="space-between"
                    >
                        <Box>
                            <IconUpload size={14} />
                        </Box>

                        <Text size="xs">Загрузить</Text>
                    </Flex>
                </Button>

                <Button
                    onClick={() => {
                        startModelFx({ modelId });
                    }}
                    disabled={!images.length}
                    color="green"
                >
                    Запуск
                </Button>

                <Button
                    onClick={() => {
                        resetImages();
                        resetResults();
                    }}
                    disabled={!images.length}
                    color="red"
                >
                    Сбросить
                </Button>
            </Flex>
        </div>
    );
};
