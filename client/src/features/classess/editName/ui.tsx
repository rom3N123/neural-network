import { Input, InputProps } from '@mantine/core';
import { classesModel } from 'entities/classess';
import { FC, HTMLProps } from 'react';

export type EditNameInputProps = {
    id: number;
    name: string;
};

export const EditNameInput: FC<EditNameInputProps> = ({ id, name }) => {
    const onBlur: HTMLProps<HTMLInputElement>['onBlur'] = ({
        currentTarget: { value },
    }) => {
        if (value) {
            classesModel.updateClass({ id, name: value });
        }
    };

    return <Input onBlur={onBlur} defaultValue={name} />;
};
