Minimum viable replacement of react-router for apps using react-redux.

# Usage

```
npm add 'github:sensedata/minimum-router'
```

Setup Redux reduction at `router:` and store `@@minimum-router/navigate` actions'
props and path.

```javascript
import {combineReducers} from "redux"
import * as MinimumRouter from "@minimum/router"

const reducer = combineReducers({
    router: MinimumRouter.reducer,
    [...]
})
```

## Routes

The simplest use is paths with elements.

```jsx
import {Routes, Route} from "@minimum/router"

return (
  <Routes>
    <Route path="/foo" element={<Foo/>}/>
    <Route path="/bar" element={<Bar/>}/>
  </Routes>
)
```

## Navigate

To navigate, `dispatch()` an action.

```javascript
import {useDispatch} from "react-redux"

const dispatch = useDispatch()
dispatch({type: "@@minimum-router/navigate", path: "/foo"})
```

## Props
Or create the action using the navigate helper.

```javascript
import {useDispatch} from "react-redux"
import {navigate} from "@minimum/router"

const dispatch = useDispatch()
dispatch(navigate("/foo"))
```

You can include props in your element or in the action or both.

```jsx
import {Routes, Route} from "@minimum/router"

return (
  <Routes>
    <Route path="/foo" element={<Foo/>}/>
    <Route path="/bar" element={<Bar bar1="baz1"/>}/>
  </Routes>
)
```

```javascript
import {useDispatch} from "react-redux"

const dispatch = useDispatch()
dispatch({type: "@@minimum-router/navigate", path: "/foo", props: {bar2: "baz2"}})
```

Or use `navigate(path, props)`

```javascript
import {useDispatch} from "react-redux"
import {navigate} from "@minimum/router"

const dispatch = useDispatch()
dispatch(navigate("/foo", {bar2: "baz2"}))
```

## Fallback

\* is a special path that will match only if `<Routes/>` matches no other `<Route path/>`.

```jsx
import {Routes, Route} from "@minimum/router"

return (
  <Routes>
    <Route path="/foo" element={<Foo/>}/>
    <Route path="/bar" element={<Bar/>}/>
    <Route path="*" element={<Baz/>}/>
  </Routes>
)
```

## Details

* `<Routes/>` will match the first `<Route path/>` with the most left to right segment matches.
* The `<Routes/>` element uses `React.cloneElement` on the `<Route element/>` of the match.
