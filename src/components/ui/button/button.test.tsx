import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Testing the Button component", () => {
    it("should be rendered correctly while button has text", () => {
        const tree = renderer.create(<Button text="test" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("should be rendered correctly while button has no text", () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("should be rendered correctly while the button is locked", () => {
        const tree = renderer.create(<Button disabled={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("should be rendered correctly while the button is loading", () => {
        const tree = renderer.create(<Button isLoader={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("should be rendered correctly while the button is clicked", () => {
        const callback = jest.fn();
        render(<Button onClick={callback} />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(callback).toHaveBeenCalled();
    });
});
