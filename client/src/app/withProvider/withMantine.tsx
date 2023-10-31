import { ReactNode } from 'react';
import { useUnit } from 'effector-react';
import { MantineProvider } from '@mantine/core';
import { $theme } from 'shared/ui/ChangeThemeButton/effector';

export const withMantine = (component: () => ReactNode) => () => {
    const theme = useUnit($theme);

    return (
        <MantineProvider
            theme={{
                fontSizes: {
                    xs: '0.75em',
                    sm: '0.87em',
                    md: '1em',
                    lg: '1.125em',
                    xl: '1.25em',
                },
                headings: {
                    fontFamily:
                        '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
                    sizes: {
                        h1: {
                            fontSize: '2.125em',
                        },
                        h2: {
                            fontSize: '1.625em',
                        },
                        h3: {
                            fontSize: '1.375em',
                        },
                        h4: {
                            fontSize: '1.125em',
                        },
                        h5: {
                            fontSize: '1em',
                        },
                        h6: {
                            fontSize: '0.875em',
                        },
                    },
                },
            }}
            withCssVariables
            forceColorScheme={theme}
        >
            {component()}
        </MantineProvider>
    );
};
