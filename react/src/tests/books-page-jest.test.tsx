import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { BooksPageContainer } from "../library/library-page";
import { Book } from "../library/models";

beforeEach(() => cleanup());

describe("Load books list with Jest", () => {

  test("get all books", async () => {
    const expectedBook: Book = { name: "test" };
    const otherBook: Book = { name: "test1" };
    const booksPromise: Promise<Book[]> = Promise.resolve([expectedBook, otherBook])
    const mockedBooks = jest
      .fn()
      .mockImplementationOnce(() => booksPromise)();

    const { getByText } = render(
      <BooksPageContainer booksQuery={() => mockedBooks} />
    );

    const list = await waitForElement(() => getByText(otherBook.name));
    expect(list).toHaveTextContent(expectedBook.name);
    expect(list).toHaveTextContent(otherBook.name);
  });

});
