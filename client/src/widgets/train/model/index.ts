import { combine, createEffect, createEvent, createStore } from 'effector';
import { classesModel } from 'entities/classess';
import {
    $classes,
    $hasImagesInEachClass,
    resetClassess,
} from 'entities/classess/model';
import { instance } from 'shared/api';

export const resetTrainConfig = createEvent();

export const updateEpochs = createEvent<number>();
export const setTestSrc = createEvent<string>();
export const setModelName = createEvent<string>();

export const $modelName = createStore('Новая модель')
    .on(setModelName, (_, value) => value)
    .on(resetTrainConfig, () => 'Новая модель');

export const $epochs = createStore(50)
    .on(updateEpochs, (_, epochs) => epochs)
    .on(resetTrainConfig, () => 50);

export const $testImageSrc = createStore<string | null>(null).on(
    setTestSrc,
    (_, src) => src
);

export const trainModelFx = createEffect(async () => {
    const modelName = $modelName.getState();
    const epochs = $epochs.getState();
    const classess = classesModel.$classes.getState();
    const formData = new FormData();
    classess.forEach(({ name, images }, index) => {
        formData.append(`classNames[${index}]`, name);
        images.forEach((image, imageIndex) => {
            formData.append(`class_${index}_images[${imageIndex}]`, image);
        });
    });
    formData.append('modelName', modelName);
    formData.append('epochs', epochs.toString());

    return await instance.post('model/train', formData);
});

const failedTraining = createEvent();

trainModelFx.fail.watch(() => {
    alert('Ошибка при обучении');
    failedTraining();
});

export const $hasTrained = createStore(false)
    .on(trainModelFx.done, () => true)
    .on(resetTrainConfig, () => false)
    .on(failedTraining, () => false);

resetTrainConfig.watch(() => {
    resetClassess();
});

export const $classNodes = $classes.map((items) =>
    items.map((item, index) => ({
        data: item,
        id: `item${item.id}`,
        position: {
            x: 0,
            y: index * 200,
        },
        type: 'item',
        resizing: false,
        draggable: false,
    }))
);

export const $nodes = $classNodes.map((nodes) => {
    const centeredY = nodes.length * 90;

    return [
        {
            data: {},
            id: 'name',
            position: {
                x: -350,
                y: centeredY,
            },
            type: 'name',
            resizing: false,
            draggable: false,
        },
        ...nodes,
        {
            data: {},
            id: 'create',
            position: {
                x: 0,
                y: nodes.length ? nodes.length * 200 : 30,
            },
            type: 'create',
            resizing: false,
            draggable: false,
        },
        {
            data: {},
            id: 'train',
            position: {
                x: 650,
                y: centeredY,
            },
            type: 'train',
            resizing: false,
            draggable: false,
        },
        {
            data: {},
            id: 'result',
            position: {
                x: 900,
                y: centeredY + 10,
            },
            type: 'result',
            resizing: false,
            draggable: false,
        },
    ];
});

export const $edges = $classNodes.map((nodes) => {
    const nameToNodes = nodes.map(({ id }) => ({
        id: `${id}-name`,
        source: 'name',
        target: id,
    }));

    const nameToTrain = nodes.map(({ id }) => ({
        id: `${id}-train`,
        source: id,
        target: 'train',
    }));

    const trainToResult = {
        id: 'train-result',
        source: 'train',
        target: 'result',
    };

    const createEdges = nodes.length
        ? []
        : [
              {
                  id: 'name-create',
                  source: 'name',
                  target: 'create',
              },
              {
                  id: 'create-train',
                  source: 'create',
                  target: 'train',
              },
          ];

    return [...nameToNodes, ...nameToTrain, trainToResult, ...createEdges];
});

export const $canTrain = combine(
    $epochs,
    $modelName,
    $hasImagesInEachClass,
    $classes,
    (epochs, modelName, hasImagesInEachClass, classess) => {
        return (
            Boolean(hasImagesInEachClass) &&
            Boolean(epochs) &&
            Boolean(modelName) &&
            classess.length >= 2
        );
    }
);
