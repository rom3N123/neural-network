import { createEvent } from 'effector';
import { classesModel } from 'entities/classess';

export const createButtonClicked = createEvent();

createButtonClicked.watch(classesModel.createClass);
