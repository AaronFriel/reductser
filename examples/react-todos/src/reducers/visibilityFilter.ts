import { actionFactory, ActionUnion, payloadAction } from 'reductser';

export enum VisibilityFilters {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE'
}

export const VisibilityFilterActions = actionFactory(
  {
    set: payloadAction<VisibilityFilters>()
  },
  'VISIBILITY_FILTER_REDUCER'
);

export default function reducer(
  state = VisibilityFilters.SHOW_ALL,
  action: ActionUnion<typeof VisibilityFilterActions>
): VisibilityFilters {
  switch (action.reducer) {
    case 'VISIBILITY_FILTER_REDUCER':
      switch (action.type) {
        case 'set':
          return action.payload;
        default:
          return action as never;
      }
      return action.payload;
    default:
      return state;
  }
}
