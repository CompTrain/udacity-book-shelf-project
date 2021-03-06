import React from 'react';

const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) => {
                        if (book.shelf === props.shelfTitleShort) {
                            const authors = (book.authors) ? book.authors.join(' | ') : '';
                            const thumbnail = (book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : '';

                            return <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage: 'url(' + thumbnail + ')'
                                        }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => {props.moveBook(event, book)}} defaultValue={props.shelfTitleShort}>
                                                <option value="" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want To Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div
                                        className="book-authors">{authors}</div>
                                </div>
                            </li>
                        } else {
                            return '';
                        }
                    })}
                </ol>
            </div>
        </div>
    )
};

export default Shelf;