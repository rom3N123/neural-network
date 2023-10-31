import { IconSun, IconMoon } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { toggleTheme, $theme } from './effector';
import { useUnit } from 'effector-react';

export const ChangeThemeButton = () => {
    const theme = useUnit($theme);
    const isDarkTheme = theme === 'dark';

    const onClick = () => {
        toggleTheme(isDarkTheme ? 'light' : 'dark');
    };

    return (
        <Button onClick={onClick} variant="subtle" size={'sm'}>
            {isDarkTheme ? <IconMoon size={20} /> : <IconSun size={20} />}
        </Button>
    );
};
