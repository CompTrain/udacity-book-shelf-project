import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';

class Search extends React.Component {

    state = {
        searchQuery: '',
        bookResults: []
    };

    handleInputChange = (event) => {
        const searchValue = event.target.value;

        this.setState({
            searchQuery: searchValue
        }, () => {
            if (this.state.searchQuery && this.state.searchQuery.length > 1) {
                this.searchBooks();
            } else {
                this.setState({
                    bookResults: []
                });
            }
        });
    };

    searchBooks = () => {
        BooksAPI.search(this.state.searchQuery).then((books) => {
            if (books.error === 'empty query') {
                books = [];
            }

            this.setState(() => {
                return { bookResults: books };
            });
        });
    };

    render() {
        const bookResults = (this.state.bookResults) ? this.state.bookResults : [];

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => this.handleInputChange(event)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { bookResults.map((book) => {

                            console.log(book);

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
                                            <select onChange={(event) => {this.props.moveBook(event, book)}}>
                                                <option value="" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want To Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{authors}</div>
                                </div>
                            </li>
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;