import React, { useState, ReactEventHandler } from "react";

interface AddNewBookCommand {
    name: string;
    author: string;
}

interface AddBookFormProps {
    addNew: (newBook: AddNewBookCommand) => void;
    cancel: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = (props: AddBookFormProps) => {
    const [book, setBook] = useState({
        name: '',
        author: ''
    } as AddNewBookCommand);

    const addNewBook = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.addNew(book);
    }
    return (<div>
        {JSON.stringify(book)}
        <form onSubmit={addNewBook}>
            <div>
                <label>Name:
                    <input
                        type="text"
                        required
                        onChange={e =>
                            setBook({ ...book, name: e.target.value })
                        } />
                </label>
            </div>
            <div>
                <label>Author:
                    <input
                        type="text"
                        required
                        onChange={e =>
                            setBook({ ...book, author: e.target.value })
                        } />
                </label>
            </div>
            <div>
                <input title="Add" type="submit" />
                <button title="Cancel" onClick={() => props.cancel()}>Cancel</button>
            </div>
        </form>
    </div>)
}

export default AddBookForm;