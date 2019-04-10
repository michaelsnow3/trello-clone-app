import { SET_TARGET } from '../constants/moveComponentConstants';

export const setTargetComponent = (targetComponent, componentType) => {
  return {
    type: SET_TARGET,
    payload: {
      targetComponent,
      componentType
    }
  };
};
