import { AppShell } from '@mantine/core';
import { useUnit } from 'effector-react';
import { FC, ReactElement, ReactNode } from 'react';
import { $fontSize } from '../ChangeFontSize/effector';
import styles from './Layout.module.scss';

export type LayoutProps = {
    navbarSlot: ReactElement;
    children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ navbarSlot, children }) => {
    const fontSize = useUnit($fontSize);

    return (
        <AppShell
            navbar={{
                width: 'auto',
                breakpoint: 'sm',
            }}
            classNames={{
                root: styles.root,
                navbar: styles.navbar,
                main: styles.main,
            }}
        >
            <AppShell.Navbar style={{ fontSize }}>{navbarSlot}</AppShell.Navbar>
            <AppShell.Main
                p="md"
                style={{
                    fontSize,
                }}
            >
                {children}
            </AppShell.Main>
        </AppShell>
    );
};
