import React, { useState } from "react";
import BookList from "./book-list";
import { Book } from "./models";
import { fetchBooksList } from "./services/books-query";
import { QueryResult } from "./services/models";
import AddBookForm from "./add-book-form";

const BooksPage = () => (
  <BooksPageContainer booksQuery={fetchBooksList} />
);

interface BooksPageContainerProps {
  booksQuery: () => Promise<Book[]>;
}

export const BooksPageContainer: React.FC<BooksPageContainerProps> = (
  props: BooksPageContainerProps
) => {
  const [isAddNewBook, setAddNewBook] = useState(false);
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState("loading" as QueryResult<Book[]>);

  props.booksQuery().then(response => setBooks(response));

  return (
    <main>
      <section role="heading" className="title">
        <button
          onClick={() => setAddNewBook(true)}
          title="Add new book to library">+</button> {title}
      </section>
      {isAddNewBook &&
        <section title="Add new book">
          <AddBookForm addNew={(b) => console.log(b)} cancel={() => setAddNewBook(false)} />
        </section>
      }
      <section id="books">
        <BookListWithLoader
          services={books}
          setSelected={s => setTitle(s.name)}
        />
      </section>
    </main>
  );
};

export const BookListWithLoader = (props: {
  services: QueryResult<Book[]>;
  setSelected: (service: Book) => void;
}) => (
    <>
      {props.services === "loading" && "Loading"}
      {props.services !== "loading" && (
        <BookList
          services={props.services.map(s => s.name)}
          onClick={serviceName => props.setSelected({ name: serviceName })}
        ></BookList>
      )}
    </>
  );

export default BooksPage;
