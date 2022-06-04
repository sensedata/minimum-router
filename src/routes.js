import React from "react";
import {useSelector} from "react-redux";

export function Routes(props) {
  const router = useSelector((state) => state?.router);
  const pathParts = (router.path) ? router.path.split("/") : [];
  let bestMatch = props.children.reduce((r, c) => {
    const score = c.props.path.split("/").reduce((r2, p, i) => {
      return (p === pathParts[i]) ? r2 + 1 : r2;
    }, 0);
    return (score > r.score) ? {score, element: c.props.element} : r
  }, {score: 0});

  if (bestMatch.score === 0) {
    bestMatch = {
      element: props.children.find((c) => c.props.path === "*")?.props.element
    };
  }
  return React.cloneElement(bestMatch?.element, router.props);
}
