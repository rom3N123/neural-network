import { createEvent, createStore } from 'effector';
import type { ClassItem } from '../types';

export const createClass = createEvent();
export const deleteClass = createEvent<{ id: ClassItem['id'] }>();
export const updateClass = createEvent<Partial<ClassItem>>();
export const addImages = createEvent<{ id: ClassItem['id']; images: File[] }>();
export const deleteImage = createEvent<{ id: ClassItem['id']; image: File }>();

export const DEFAULT_CLASSESS = [
    {
        id: 1,
        images: [],
        name: 'Класс 1',
    },
    {
        id: 2,
        images: [],
        name: 'Класс 2',
    },
];

export const resetClassess = createEvent();

export const $classes = createStore<ClassItem[]>(DEFAULT_CLASSESS)
    .on(resetClassess, () => [...DEFAULT_CLASSESS])
    .on(createClass, (classess) => {
        const newClass: ClassItem = {
            id: Date.now(),
            name: 'Новый класс',
            images: [],
        };

        return [...classess, newClass];
    })
    .on(deleteClass, (classess, { id }) =>
        classess.filter(({ id: classId }) => classId !== id)
    )
    .on(updateClass, (classess, { id, ...fields }) => {
        const index = classess.findIndex(({ id: classId }) => classId === id);

        const needle = classess[index];

        const newClass = {
            ...needle,
            ...fields,
        };

        const newClassess = [...classess];
        newClassess[index] = newClass;

        return newClassess;
    })
    .on(addImages, (classess, { id, images }) => {
        const index = classess.findIndex(({ id: classId }) => classId === id);

        const needle = classess[index];

        const newClass = {
            ...needle,
            images: [...needle.images, ...images],
        };

        const newClassess = [...classess];
        newClassess[index] = newClass;

        return newClassess;
    })
    .on(deleteImage, (classess, { id, image }) => {
        const index = classess.findIndex(({ id: classId }) => classId === id);

        const needle = classess[index];

        const newClass = {
            ...needle,
            images: needle.images.filter((classImage) => classImage !== image),
        };

        const newClassess = [...classess];
        newClassess[index] = newClass;

        return newClassess;
    });

export const $hasImagesInEachClass = $classes.map((items) =>
    items.every((item) => item.images.length > 0)
);
