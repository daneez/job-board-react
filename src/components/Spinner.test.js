import React from "react";
import { render, cleanup } from '@testing-library/react';
import Spinner from "./Spinner";

afterEach(cleanup);

it("should render loading", () => {
  const { getByText } = render(<Spinner />);
  expect(getByText("Loading...")).toBeInTheDocument();
});