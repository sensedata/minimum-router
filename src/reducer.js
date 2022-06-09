export function reducer(state = {}, action) {
  if (!action || action.type !== "@@minimum-router/navigate") {
    return state;
  }

  return Object.assign({}, state, {path: action.path, props: action.props});
}
