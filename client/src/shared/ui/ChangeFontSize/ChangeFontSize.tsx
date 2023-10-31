import { Slider } from '@mantine/core';
import { useUnit } from 'effector-react';
import { $fontSize, changeFontSize } from './effector';

export const ChangeFontSizes = () => {
    const fontSize = useUnit($fontSize);
    return (
        <Slider
            value={fontSize}
            onChange={(value) => {
                changeFontSize(value);
            }}
            min={16}
            max={24}
            step={1}
        />
    );
};
