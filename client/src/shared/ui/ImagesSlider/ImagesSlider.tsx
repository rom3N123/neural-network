import { Box, Button, Image } from '@mantine/core';
import styles from './ImagesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FC, useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';

const w = 58;

type DeleteParams = {};

export type ImagesSliderProps = {
    images: File[];
    onDelete: (image: File) => any;
};

export const ImagesSlider: FC<ImagesSliderProps> = ({ images, onDelete }) => {
    const [urls, setUrls] = useState<string[]>([]);

    useEffect(() => {
        urls.forEach((url) => {
            URL.revokeObjectURL(url);
        });

        setUrls(() => images.map(URL.createObjectURL));
    }, [images]);

    const onDeleteClick = (index: number) => () => {
        const image = images[index];

        onDelete(image);
    };

    return (
        <Swiper slidesPerView={6} spaceBetween={8}>
            {urls.map((url, index) => {
                return (
                    <SwiperSlide key={url}>
                        <Box pos="relative">
                            <Image
                                w={w}
                                h={w}
                                radius="xs"
                                fit="fill"
                                src={url}
                            />

                            <Button
                                onClick={onDeleteClick(index)}
                                pos="absolute"
                                top="0"
                                radius="xs"
                                left="0"
                                style={{ padding: '0' }}
                                variant="filled"
                                h="18px"
                                w="18px"
                                color="red"
                            >
                                <IconTrash size={10} />
                            </Button>
                        </Box>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};
