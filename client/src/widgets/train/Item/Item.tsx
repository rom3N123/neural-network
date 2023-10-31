import { Box, Button, Flex, Menu, Text, TextInput, em } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $theme } from 'shared/ui/ChangeThemeButton/effector';
import styles from './Item.module.scss';
import clsx from 'clsx';
import { IconDotsVertical, IconEdit } from '@tabler/icons-react';
import { LoadImagesButton } from '../loadImagesButton';
import { ImagesSlider } from 'shared/ui/ImagesSlider';
import { Handle, Position } from 'reactflow';
import { ClassItem } from 'entities/classess';
import { ChangeEventHandler, FC } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { deleteClass, deleteImage, updateClass } from 'entities/classess/model';

export type ItemProps = {
    data: ClassItem;
};

export const Item: FC<ItemProps> = ({ data: { images, id, name } }) => {
    const theme = useUnit($theme);
    const [isEditing, { open: enableEdit, close: disableEdit }] =
        useDisclosure(false);

    const onChangeClassName: ChangeEventHandler<HTMLInputElement> = ({
        currentTarget: { value },
    }) => {
        updateClass({
            id,
            name: value,
        });
    };

    const onDelete = (image: File) => {
        deleteImage({
            id,
            image,
        });
    };

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            <Box className={clsx(styles.box, styles[`box_${theme}`])}>
                <Flex
                    justify="space-between"
                    align="center"
                    p="sm"
                    className={styles.header}
                >
                    {!isEditing ? (
                        <Button
                            onClick={enableEdit}
                            p="xs"
                            variant="subtle"
                            rightSection={<IconEdit size={14} />}
                        >
                            {name}
                        </Button>
                    ) : (
                        <TextInput
                            onBlur={disableEdit}
                            autoFocus
                            value={name}
                            onChange={onChangeClassName}
                        />
                    )}

                    <div>
                        <Menu>
                            <Menu.Target>
                                <Button
                                    variant="subtle"
                                    className={styles.dots}
                                >
                                    <IconDotsVertical size={14} />
                                </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    onClick={() => {
                                        deleteClass({ id });
                                    }}
                                    color="red"
                                    style={{
                                        height: em(30),
                                    }}
                                >
                                    Удалить класс
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                </Flex>

                <Flex direction="column" gap="sm" p="sm">
                    <Text>Добавьте изображения:</Text>

                    <Flex align="center" gap="sm">
                        <div>
                            <LoadImagesButton id={id} />
                        </div>

                        <div className={styles.sliderContainer}>
                            <ImagesSlider onDelete={onDelete} images={images} />
                        </div>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};
