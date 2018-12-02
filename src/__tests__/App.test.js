import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, configure } from "enzyme";
import App from "../App";
import Game from "../components/Game";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("App component", function() {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render App successfully", () => {
    const appElement = wrapper.find(".App");
    expect(appElement).toMatchSnapshot();
  });

  it("should have a proper class name", () => {
    const appElement = wrapper.hasClass("App");
    expect(appElement).toBeTruthy();
  });

  it("should have a Play button", () => {
    const playButton = wrapper.find(".play-button");
    expect(playButton).toBeTruthy();
  });

  it("should have an onClick handler on Play button", () => {
    const handler = wrapper.find(".play-button").props().onClick;
    expect(handler).toBeTruthy();
  });

  it("should have App state", () => {
    const appState = wrapper.state().renderComponent;
    expect(appState).toBe(false);
  });

  it("should have a handleClick method", () => {
    const handler = wrapper.instance().handleClick;
    expect(handler).toBeTruthy();
  });

  it("should click on a Play button and change App state", () => {
    wrapper.find(".play-button").simulate("click");
    const appState = wrapper.state().renderComponent;
    expect(appState).toBe(true);
  });

  it("should include a Game component after clicking Play button", () => {
    wrapper.find(".play-button").simulate("click");
    const gameComponent = wrapper.find(Game).length;
    expect(gameComponent).toEqual(1);
  });

  it("should change a Play button to a Quit button after clicking Play button", () => {
    wrapper.find(".play-button").simulate("click");
    const quitButtonText = wrapper
      .find(".play-button")
      .childAt(0)
      .text();
    expect(quitButtonText).toContain("quit");
  });
});
