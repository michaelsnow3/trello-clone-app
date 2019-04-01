import { SET_TARGET } from '../constants/moveComponentConstants';

const moveComponentInitialState = {
  targetComponent: null,
  hoveredComponent: null,
  componentType: null
};

export const moveComponent = (state = moveComponentInitialState, action = {}) => {
  switch (action.type) {
    case SET_TARGET:
      return {
        ...state,
        targetComponent: action.payload.targetComponent,
        hoveredComponent: action.payload.hoveredComponent,
        componentType: action.payload.componentType
      };
    default:
      return state;
  }
};
