import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const toggleTheme = createEvent<'dark' | 'light'>();

export const $theme = createStore<'dark' | 'light'>('dark').on(
    toggleTheme,
    (_, theme) => theme
);

persist({
    sync: true,
    source: toggleTheme,
    target: $theme,
    key: 'theme',
});
