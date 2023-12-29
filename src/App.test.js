import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockFetch from "./mocks/mockFetch";
import App from "./App";

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("should the search reset works correctly", async () => {
  render(<App />);

  //Simulate selecting an option and verifying its value
  const select = screen.getByRole("combobox");
  expect(
    await screen.findByRole("option", { name: "cattledog" })
  ).toBeInTheDocument();
  userEvent.selectOptions(select, "cattledog");
  expect(select).toHaveValue("cattledog");

  //Initiate the search request
  const searchBtn = screen.getByRole("button", { name: "Search" });
  expect(searchBtn).not.toBeDisabled();
  userEvent.click(searchBtn);

  //Loading state displays and gets removed once results are displayed
  await waitForElementToBeRemoved(() => screen.queryByText(/Loading/i));

  //verify the reset click the search
  const resetSearch = screen.getByRole("button", { name: "Reset" });
  expect(resetSearch).not.toBeDisabled();
  userEvent.click(resetSearch);
  expect(screen.getByRole("combobox")).toHaveDisplayValue("Select a breed");
  
  
  // Check if the placeholder image is displayed with alt text "no image"
  const placeholderImage = screen.getByAltText("no image");
  expect(placeholderImage).toBeInTheDocument();


});