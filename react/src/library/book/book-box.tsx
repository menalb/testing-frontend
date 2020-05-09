import React from "react";
import "./book-box.css";

const BookBox = (props: { serviceName: string }) =>
  (
    <div className="card">
      <div className="card_title title-black">
        <p>{props.serviceName}</p>
      </div>
    </div>
  );

export default BookBox;
