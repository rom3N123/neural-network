import { createStore, createEvent, createEffect } from 'effector';
import { instance } from 'shared/api';
import { Model } from './types';

export const deleteModelFx = createEffect(
    ({ modelId }: { modelId: string }) => {
        return instance.delete(`models/${modelId}`);
    }
);

export const fetchModelsFx = createEffect(async () => {
    const { data } = await instance.get<Model[]>('models');

    return data;
});

export const $models = createStore<Model[]>([])
    .on(deleteModelFx.done, (state, { params: { modelId } }) => {
        return state.filter(({ id }) => {
            return id !== modelId;
        });
    })
    .on(deleteModelFx.fail, () => {
        alert('Произошла ошибка');
    })
    .on(fetchModelsFx.done, (_, { result }) => result)
    .on(fetchModelsFx.fail, () => alert('Ощибка при загрузке моделей'));

export const $isLoading = createStore(true).on(
    fetchModelsFx.finally,
    () => false
);
