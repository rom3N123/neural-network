import { Popover, Text } from '@mantine/core';
import styles from './Settings.module.scss';
import { ChangeThemeButton } from '../ChangeThemeButton/ChangeThemeButton';
import { ChangeFontSizes } from '../ChangeFontSize/ChangeFontSize';
import { Button } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';

export const Settings = () => {
    return (
        <Popover width={173} position="bottom" withArrow shadow="md">
            <Popover.Target>
                <Button variant="subtle">
                    <IconSettings size={20} />
                </Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Text size={'md'}>Размер шрифта</Text>
                <ChangeFontSizes />
                <div className={styles.containerTheme}>
                    <Text size={'md'}>Тема</Text>
                    <ChangeThemeButton />
                </div>
            </Popover.Dropdown>
        </Popover>
    );
};
