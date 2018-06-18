import React from 'react';

class Read extends React.Component {
    render() {

        console.log(this.props);

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => {
                            if (book.shelf === 'read') {
                                return <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage: 'url(' + book.imageLinks.thumbnail + ')'
                                            }}></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={(event) => {this.props.moveBook(event, book)}}>
                                                    <option value="" disabled>Move to...</option>
                                                    <option defaultValue=""></option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want To Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors.join(' | ')}</div>
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
    }
}

export default Read;