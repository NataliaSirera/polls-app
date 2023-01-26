import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import store from "../store";

describe("Dashboard", () => {
  it("renders the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("by default shows Done questions", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );
    const showDoneQuestions = component.getByTestId("checkboxDoneQuestions");
    expect(showDoneQuestions.checked).toEqual(true);
  });
});
