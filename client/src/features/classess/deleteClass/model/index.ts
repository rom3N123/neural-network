import { createEvent } from 'effector';
import { classesModel } from 'entities/classess';

export const deleteButtonClicked = createEvent<{ id: number }>();

deleteButtonClicked.watch(classesModel.deleteClass);
