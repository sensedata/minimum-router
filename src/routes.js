import React from "react";
import {useSelector} from "react-redux";

export function Routes(props) {
  if (!(props?.children?.length > 0)) {
    return React.createElement("div", {className: "minimum-router.empty-routes"});
  }

  const router = useSelector((state) => state?.router);

  const pathParts = pathSplit(router.path);
  let bestMatch = props.children.reduce((r, c) => {
    const score = pathSplit(c.props.path).reduce((r2, p, i) => {
      return (p === pathParts[i]) ? r2 + 1 : r2;
    }, 0);
    return (score > r.score) ? {score, element: c.props.element} : r
  }, {score: 0});

  if (bestMatch.score === 0) {
    bestMatch = {
      element: props.children.find((c) => c.props.path === "*")?.props.element
    };

    if (!bestMatch.element && !(router?.path?.length > 0)) {
      return React.createElement("div", {className: "minimum-router no-router-path no-fallback"});
    }
  }

  if (!bestMatch?.element) {
    return React.createElement("div", {className: "minimum-router no-route-match"})
  }

  return React.cloneElement(bestMatch?.element, router.props);
}

function pathSplit(p) {
  return (p) ? p.replace(/^\/(.)/, "$1").split("/") : [];
}
