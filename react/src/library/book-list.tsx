import React from "react";
import BookBox from "./book/book-box";
import "./book-list.css";

const BookList = (props: {
  services: string[];
  onClick: (name: string) => void;
}) => (
    <div className="book-list">
      {props.services.map((service, i) => (
        <span key={i} onClick={() => props.onClick(service)}>
          <BookBox key={i} serviceName={service}></BookBox>
        </span>
      ))}
    </div>
  );

export default BookList;
