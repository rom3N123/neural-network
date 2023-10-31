import { CloseButton } from '@mantine/core';
import { FC } from 'react';
import { deleteButtonClicked } from '../model';

export type DeleteClassButtonProps = {
    id: number;
};

export const DeleteClassButton: FC<DeleteClassButtonProps> = ({ id }) => {
    const onClick = () => {
        deleteButtonClicked({ id });
    };

    return <CloseButton onClick={onClick} />;
};
