import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import User from "../../components/User";

configure({ adapter: new Adapter() });

describe("User component", function() {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<User />);
  });
});
