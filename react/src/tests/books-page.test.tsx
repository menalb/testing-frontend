import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import {
  BookListWithLoader,
  BooksPageContainer
} from "../library/library-page";
import { Book } from "../library/models";

beforeEach(() => cleanup());

test("Loading", () => {
  const { getByText } = render(
    <BookListWithLoader services={"loading"} setSelected={() => { }} />
  );

  expect(getByText("Loading")).toHaveTextContent("Loading");
});

describe("Load books list", () => {
  test("get all books", async () => {
    const [expectedBookName, expected] = getDefaultBooksDataSet();
    const { getByText } = buildBookContainerPage(expected);

    const list = await waitForElement(() => getByText(expectedBookName));

    expect(list).toHaveTextContent(expectedBookName);
  });

  test("no book no items on the page", async () => {
    const expected = getEmptyServicesDataSet();
    buildBookContainerPage(expected);

    const list = await waitForElement(() =>
      document.body.querySelector(".book-list")
    );

    expect(list).toHaveTextContent("");
  });

  test("click book change page title", async () => {
    const [expectedBookName, expected] = getDefaultBooksDataSet();
    const { getByRole, getByText } = buildBookContainerPage(expected);

    fireEvent.click(await waitForElement(() => getByText(expectedBookName)));

    const header = await waitForElement(() => getByRole(/heading/i));
    expect(header).toHaveTextContent(expectedBookName);
  });

  const getEmptyServicesDataSet = (): Book[] => [];

  const getDefaultBooksDataSet = (
    expectedBookName: string = "test"
  ): [string, Book[]] => [
      expectedBookName,
      [{ name: expectedBookName }]
    ];
  const buildBookContainerPage = (
    books: Book[] = [{ name: "test" }]
  ) =>
    render(
      <BooksPageContainer booksQuery={() => Promise.resolve(books)} />
    );
});
