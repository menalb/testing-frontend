import React, { useState } from "react";
import BookList from "./book-list";
import { Book } from "./models";
import { fetchBooksList } from "./services/books-query";
import { QueryResult } from "./services/models";

const BooksPage = () => (
  <BooksPageContainer booksQuery={fetchBooksList} />
);

interface BooksPageContainerProps {
  booksQuery: () => Promise<Book[]>;
}

export const BooksPageContainer: React.FC<BooksPageContainerProps> = (
  props: BooksPageContainerProps
) => {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState("loading" as QueryResult<Book[]>);

  props.booksQuery().then(response => setBooks(response));

  return (
    <main>
      <section role="heading" className="title">
        {title}
      </section>
      <section id="services">
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
