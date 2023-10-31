import { Button } from '@mantine/core';
import { createButtonClicked } from '../model';

export const CreateClassButton = () => {
    const onClick = () => {
        createButtonClicked();
    };

    return (
        <Button onClick={onClick} color="green">
            Создать класс
        </Button>
    );
};
