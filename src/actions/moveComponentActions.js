import {
  SET_TARGET
} from '../constants/moveComponentConstants';

export const setTargetComponent = (targetComponent, hoveredComponent, componentType) => {
  return {
    type: SET_TARGET,
    payload: {
      targetComponent,
      hoveredComponent,
      componentType
    }
  };
};