import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Testing the Circle Component", () => {
  it("should be rendered correctly when the circle is empty", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has text", () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has head", () => {
    const tree = renderer.create(<Circle head="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has react-element in head", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has tail", () => {
    const tree = renderer.create(<Circle tail="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has react-element in tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has index", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle has prop isSmall === true", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle is in default state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle is in changing state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should be rendered correctly when the circle is in modified state", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});