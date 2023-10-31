import { Box, Button, Flex, Text } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import styles from './LoadImagesButton.module.scss';
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { classesModel } from 'entities/classess';

export type LoadImagesButtonProps = {
    id: number;
};

export const LoadImagesButton: FC<LoadImagesButtonProps> = ({ id }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'images/*': [],
        },
        onDropAccepted: (images) => {
            classesModel.addImages({
                id,
                images,
            });
        },
    });

    return (
        <>
            <input {...getInputProps()} />

            <Button
                {...getRootProps()}
                className={styles.button}
                variant="outline"
            >
                <Flex direction="column" align="center" justify="space-between">
                    <Box>
                        <IconUpload size={14} />
                    </Box>

                    <Text size="xs">Загрузить</Text>
                </Flex>
            </Button>
        </>
    );
};
