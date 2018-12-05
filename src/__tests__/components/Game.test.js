import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Game from "../../components/Game";
import User from "../../components/User";
import ScoreTable from "../../components/ScoreTable";

configure({ adapter: new Adapter() });

describe("Game component", function() {
  let wrapper;
  let userWrapper;

  beforeEach(() => {
    wrapper = shallow(<Game />);
    userWrapper = shallow(<User />);
  });

  it('should be selectable by class ".game-section"', () => {
    const gameSection = wrapper.is(".game-section");
    expect(gameSection).toBeTruthy();
  });

  it("should mount in a full DOM", () => {
    const gameSection = wrapper.find(".game-section");
    expect(gameSection.length).toBe(1);
  });

  it("rendered successfully", () => {
    const gameSection = wrapper.find(".game-section");
    expect(gameSection).toMatchSnapshot();
  });

  it('should change state and show "Next round" button when clicking on icon', () => {
    userWrapper
      .find(".choice-icons")
      .children()
      .first()
      .simulate("click");
    wrapper.update();
    const button = wrapper.find(".next-round-btn").text();
    expect(button).toContain("Next Round");
  });

  it("should click Next Round button and change Round", () => {
    userWrapper
      .find(".choice-icons")
      .children()
      .first()
      .simulate("click");
    const round1 = wrapper.find(".round").text();
    expect(round1).toEqual("Round 1");

    wrapper.find(".next-round-btn").simulate("click");
    const round2 = wrapper.find(".round").text();

    expect(round2).toEqual("Round 2");
  });

  it("should click on icon and change Game state", () => {
    wrapper
      .find(".choice-icons")
      .children()
      .first()
      .simulate("click");
    const gameState = wrapper.state().userClicked;
    expect(gameState).toBe(true);
  });

  it("should click on Restart game button and change Round to 1", () => {
    wrapper
      .find(".choice-icons")
      .children()
      .first()
      .simulate("click");
    wrapper.find(".restart-btn").simulate("click");
    const round = wrapper.find(".round").text();
    expect(round).toBe("Round 1");
  });

  it("should show a score table after user makes a choice", () => {
    wrapper
      .find(".choice-icons")
      .children()
      .first()
      .simulate("click");
    const ScoreTableWrapper = wrapper.find(ScoreTable).length;
    expect(ScoreTableWrapper).toEqual(1);
  });
});
