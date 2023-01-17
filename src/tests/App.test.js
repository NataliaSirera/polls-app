import { render } from "@testing-library/react";
import App from "../components/App";

describe("App", () => {
  it("has title", () => {
    const component = render(<App />);
    const h1 = component.getByText("Polls App");
    expect(h1).toBeInTheDocument();
  });
});
