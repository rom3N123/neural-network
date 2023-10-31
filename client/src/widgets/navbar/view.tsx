import { List, NavLink } from '@mantine/core';
import { Link } from 'atomic-router-react';
import { routes } from 'shared/config';
import {
    IconBooks,
    IconPhotoAi,
    IconVideo,
    IconBrandOpenai,
} from '@tabler/icons-react';

import styles from './view.module.scss';
import { FC } from 'react';

import { Settings } from 'shared/ui/Settings/Settings';

export type NavbarProps = {
    trainImagesActive?: boolean;
    modelsActive?: boolean;
};

export const Navbar: FC<NavbarProps> = ({
    trainImagesActive,
    modelsActive,
}) => {
    return (
        <div className={styles.container}>
            <List className={styles.list} spacing="xs" center>
                <List.Item className={styles.item}>
                    <Link className={styles.link} to={routes.train}>
                        <NavLink
                            leftSection={<IconBooks size="1rem" />}
                            label="Обучить"
                            active={trainImagesActive}
                        />
                    </Link>

                    <Link className={styles.link} to={routes.models}>
                        <NavLink
                            active={modelsActive}
                            leftSection={<IconBrandOpenai size="1rem" />}
                            label="Модели"
                        />
                    </Link>
                </List.Item>
            </List>

            <div className={styles.bottomContainer}>
                <Settings />
            </div>
        </div>
    );
};
