export default (state = {}, action) => {
  if (action?.type !== "@@minimum-router/navigate") {
    return state;
  }

  return Object.assign({}, state, {path: action.path, props: action.props});
}
