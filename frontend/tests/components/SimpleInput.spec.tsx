import { render, screen } from "@testing-library/react";
import { SimpleInput } from "../../src/components/SimpleInput";

describe("SimpleInput Component", () => {
  it("Should renders correctly", () => {
    render(<SimpleInput value="" placeholder="test" handleChange={() => {}} />);

    expect(screen.getByPlaceholderText("test")).toBeInTheDocument();
  });
});
