import { render, screen } from "@testing-library/react";
import { SimpleButton } from "../../src/components/SimpleButton";

describe("SimpleButton Component", () => {
  it("Should renders correctly", () => {
    render(<SimpleButton>test</SimpleButton>);

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
