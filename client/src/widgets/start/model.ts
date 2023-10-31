import { createEffect, createEvent, createStore } from 'effector';
import { instance } from 'shared/api';
import { Results } from './types';

export const resetImages = createEvent();
export const resetResults = createEvent();
export const addImages = createEvent<File[]>();

export const $images = createStore<File[]>([])
    .on(addImages, (state, images) => [...state, ...images])
    .on(resetImages, () => []);

export const startModelFx = createEffect(
    async ({ modelId }: { modelId: string }) => {
        const images = $images.getState();

        const formData = new FormData();
        images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        const { data } = await instance.post<Results>(
            `models/${modelId}/start`,
            formData
        );

        return data;
    }
);

export const $results = createStore<Results>([])
    .on(startModelFx.doneData, (_, result) => result)
    .on(resetResults, () => []);
