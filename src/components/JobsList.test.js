import React from "react";
import { render, cleanup } from '@testing-library/react';
import JobsList from "./JobsList";

afterEach(cleanup);

it("should render loading spinner before fetching data", () => {
  const { getByText } = render(<JobsList />);
  expect(getByText("Loading...")).toBeInTheDocument();
});
