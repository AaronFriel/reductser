import { connect, Dispatch } from 'react-redux';
import { AnyAction } from 'redux';

import Link, { LinkProps } from '../components/Link';
import { VisibilityFilterActions, VisibilityFilters } from '../reducers';
import { State } from '../store';

interface Props {
  filter: VisibilityFilters;
}

function mapStateToProps(
  state: State,
  ownProps: Props
): Pick<LinkProps, 'active'> {
  return {
    active: ownProps.filter === state.visibilityFilter
  };
}

function mapDispatchToProps(
  dispatch: Dispatch<AnyAction>,
  ownProps: Props
): Pick<LinkProps, 'onClick'> {
  return {
    onClick: () => dispatch(VisibilityFilterActions.set(ownProps.filter))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Link);
