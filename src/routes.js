import React from "react";
import {useSelector} from "react-redux";

export function Routes(props) {
  if (!props || !props.children || props.children.length <= 0) {
    return React.createElement("div", {className: "minimum-router.empty-routes"});
  }

  const router = useSelector(s => s.router);

  const pathParts = pathSplit(router.path);
  let bestMatch = props.children.reduce((r, c) => {
    const score = pathSplit(c.props.path).reduce((r2, p, i) => {
      return (p === pathParts[i]) ? r2 + 1 : r2;
    }, 0);
    return (score > r.score) ? {score, element: c.props.element} : r
  }, {score: 0});

  if (bestMatch.score === 0) {
    const found = props.children.find((c) => c.props.path === "*");
    const element = found && found.props && found.props.element;
    bestMatch = {element};

    if (!bestMatch.element && !(router && router.path && router.path.length > 0)) {
      return React.createElement("div", {className: "minimum-router no-router-path no-fallback"});
    }
  }

  if (!bestMatch || !bestMatch.element) {
    return React.createElement("div", {className: "minimum-router no-route-match"})
  }

  return React.cloneElement(bestMatch.element, router.props);
}

function pathSplit(p) {
  return (p) ? p.replace(/^\/(.)/, "$1").split("/") : [];
}
