import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import Login from "./Login";
import store from "../store";

describe("Login", () => {
  it("renders the component", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  it("logs a user in", async () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const username = component.getByTestId("username");
    const password = component.getByTestId("password");
    fireEvent.change(username, { target: { value: "sarahedo" } });
    fireEvent.change(password, { target: { value: "password123" } });
    expect(username.value).toBe("sarahedo");
    expect(password.value).toBe("password123");
  });
});
