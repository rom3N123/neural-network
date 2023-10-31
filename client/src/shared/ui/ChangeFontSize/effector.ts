import { createEvent, createStore } from 'effector';
import { persist } from 'effector-storage/local';

export const changeFontSize = createEvent<number>();

export const $fontSize = createStore<number>(16).on(
    changeFontSize,
    (_, value) => value
);

persist({
    sync: true,
    source: changeFontSize,
    target: $fontSize,
    key: 'fontSize',
});
