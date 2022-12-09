import { render, screen } from "@testing-library/react";
import { SimpleToast } from "../../src/components/SimpleToast";

describe("SimpleToast Component", () => {
  it("Should renders correctly", () => {
    render(<SimpleToast handleClose={() => {}} text="test" type="error" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
