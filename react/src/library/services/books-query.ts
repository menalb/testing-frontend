import { Book } from "../models";

export const fetchBooksList = async (): Promise<Book[]> => {
    const url = `${process.env.REACT_APP_API ?? ''}`;
    const response = await fetch(url);

    return await response.json();
};