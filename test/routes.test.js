import React from "react";
import {Provider} from "react-redux";
import testRenderer from "react-test-renderer";
import {createStore, combineReducers} from "redux";

import {navigate} from "../src/navigate.js";
import {reducer} from "../src/reducer.js";
import {Route} from "../src/route.js";
import {Routes} from "../src/routes.js";


describe("<Routes>", () => {
  let store;

  function createRoutesRenderer(...routes) {
    return testRenderer.create(
      React.createElement(Provider, {store},
        React.createElement(Routes, null,
          routes.map((r) => React.createElement(Route, {
            path: (r === "*") ? r : "/" + r,
            key: r,
            element: React.createElement("div", {id: ((r === "*") ? "fallback" : ((r === "") ? "root" : r))})
          }))
        )
      )
    );
  }

  beforeEach(() => {
    store = createStore(combineReducers({router: reducer}));
  });

  afterEach(() => {
    store = null;
  });

  describe("given no routes", () => {
    let snapshot;

    beforeEach(() => {
      snapshot = createRoutesRenderer().toJSON();
    });

    it("renders a div", () => {
      expect(snapshot.type).toBe("div");
    });

    it("... with no children", () => {
      expect(snapshot.props.children).toBeFalsy();
    });

    it("... and the CSS classes \"minimum-router\" and \"empty-routes\"", () => {
      expect(snapshot.props.className).toContain("minimum-router");
      expect(snapshot.props.className).toContain("empty-routes");
    });
  });

  describe("without a fallback", () => {
    describe("with a couple routes", () => {
      let routesRenderer;

      beforeEach(() => {
        routesRenderer = createRoutesRenderer("", "test1", "test2");
      });

      describe("given no router.path", () => {
        let snapshot;
        beforeEach(() => {
          snapshot = routesRenderer.toJSON();
        });

        it("renders a div", () => {
          expect(snapshot.type).toBe("div");
        });

        it("... with no children", () => {
          expect(snapshot.props.children).toBeFalsy();
        });

        it("... and the CSS classes \"minimum-router\", \"no-router-path\", and \"no-fallback\"", () => {
          expect(snapshot.props.className).toContain("minimum-router");
          expect(snapshot.props.className).toContain("no-router-path");
          expect(snapshot.props.className).toContain("no-fallback");
        });
      });

      describe("given an unmatching router.path", () => {
        let snapshot;

        beforeEach(async () => {
          await testRenderer.act(() => {
            store.dispatch(navigate("/testX"));
          });
          snapshot = routesRenderer.toJSON();
        });

        it("renders a div", () => {
          expect(snapshot.type).toBe("div");
        });

        it("... with no children", () => {
          expect(snapshot.props.children).toBeFalsy();
        });

        it("... and the CSS classes \"minimum-router\" and \"no-route-match\"", () => {
          expect(snapshot.props.className).toContain("minimum-router");
          expect(snapshot.props.className).toContain("no-route-match");
        });
      });

      describe("given a matching router.path", () => {
        it("renders the matching element", async () => {
          await testRenderer.act(() => {
            store.dispatch(navigate("/test1"));
          });
          const snapshot = routesRenderer.toJSON();
          expect(snapshot.props.id).toBe("test1");
        });
      });

      describe("given a matching root path", () => {
        it("renders the matching element", async () => {
          await testRenderer.act(() => {
            store.dispatch(navigate("/"));
          });
          const snapshot = routesRenderer.toJSON();
          expect(snapshot.props.id).toBe("root");
        });
      });
    });
  });

  describe("with a fallback", () => {
    describe("with a couple routes", () => {
      let routesRenderer;

      beforeEach(() => {
        routesRenderer = createRoutesRenderer("", "test1", "test2", "*");
      });

      describe("given no router.path", () => {
        it("renders the fallback", () => {
          const snapshot = routesRenderer.toJSON();
          expect(snapshot.props.id).toBe("fallback");
        });
      });

      describe("given an unmatching router.path", () => {
        it("renders the fallback", async () => {
          await testRenderer.act(() => {
            store.dispatch(navigate("/testX"));
          });
          const snapshot = routesRenderer.toJSON();
          expect(snapshot.props.id).toBe("fallback");
        });
      });

      describe("given a matching router.path", () => {
        it("renders the matching element", async () => {
          await testRenderer.act(() => {
            store.dispatch(navigate("/test1"));
          });
          const snapshot = routesRenderer.toJSON();
          expect(snapshot.props.id).toBe("test1");
        });
      });

      describe("given a matching root path", () => {
        it("renders the matching element", async () => {
          await testRenderer.act(() => {
            store.dispatch(navigate("/"));
          });
          const snapshot = routesRenderer.toJSON();
          expect(snapshot.props.id).toBe("root");
        });
      });
    });
  });
});
