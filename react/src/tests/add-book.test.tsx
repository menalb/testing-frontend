import React from "react";
import {
    screen,
    render,
    cleanup,
    fireEvent,
    waitForElement,
    getByTitle
} from "@testing-library/react";
import { BooksPageContainer } from "../library/library-page";
import { Book } from "../library/models";

beforeEach(() => cleanup());

describe("add new book", () => {
    test("show", async () => {
        const { getByText } = buildBookContainerPage();

        fireEvent.click(await waitForElement(() => getByText("+")));

        const form = await waitForElement(() =>
            screen.queryByTitle('Add new book')
        );

        expect(form).toBeVisible()
        expect(form).toHaveTextContent("Author:");
        expect(form).toHaveTextContent("Name:");
    });

    test("hide", async () => {
        const { getByText, getByTitle, getByRole } = buildBookContainerPage();

        fireEvent.click(await waitForElement(() => getByText("+")));

        fireEvent.click(await waitForElement(() => getByTitle('Cancel')));

        await waitForElement(() => getByRole(/heading/i));

        expect(screen.queryByTitle('Add new book')).not.toBeInTheDocument()
    });

    const buildBookContainerPage = (
        books: Book[] = [{ name: "test" }]
    ) =>
        render(
            <BooksPageContainer booksQuery={() => Promise.resolve(books)} />
        );
});
