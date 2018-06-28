import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';

// Needed to handle the polyfill for Array.prototype.find as the react-starter-app
// doesn't support some experimental ES6 features.
import find from 'array.prototype.find';

class Search extends React.Component {

    state = {
        searchQuery: '',
        bookResults: []
    };

    /**
     * Will fire whenever the search bar input changes.
     * We will want to search the books by keyword and then empty
     * out the list if there is no search query.
     *
     * @param event
     */
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

    /**
     * Search against the Books API for the search query and set
     * the bookResults state to the books that are returned.
     */
    searchBooks = () => {
        BooksAPI.search(this.state.searchQuery).then((books) => {
            if (books.error === 'empty query') {
                books = [];
            }

            this.setState({
                bookResults: books
            });
        });
    };

    /**
     * Checks to see if the current book we are iterating over is on one of the book shelves
     * that we have on our frontpage.  If it is, then return the shelf that the book is currently on.
     *
     * @param bookList
     * @param bookResult
     * @returns {*|string}
     */
    checkIfBookIsOnAShelf = (bookList, bookResult) => {
        let dropdownSelectedValue = '';

        if (bookList.length > 0) {
            dropdownSelectedValue = find(bookList, book => book.id === bookResult.id);

            if (dropdownSelectedValue) {
                dropdownSelectedValue = dropdownSelectedValue.shelf;
            } else {
                dropdownSelectedValue = 'none';
            }
        } else {
            dropdownSelectedValue = 'none';
        }

        return dropdownSelectedValue;
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link onClick={this.forceUpdate} to='/' className="close-search">Close</Link>
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
                        { this.state.bookResults.map((bookResult) => {
                            const authors = (bookResult.authors) ? bookResult.authors.join(' | ') : '';
                            const thumbnail = (bookResult.imageLinks && bookResult.imageLinks.thumbnail) ? bookResult.imageLinks.thumbnail : '';

                            let dropdownSelectedValue = this.checkIfBookIsOnAShelf(this.props.books, bookResult);

                            return <li key={bookResult.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage: 'url(' + thumbnail + ')'
                                        }}></div>
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => {this.props.moveBook(event, bookResult)}} defaultValue={dropdownSelectedValue}>
                                                <option value="" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want To Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{bookResult.title}</div>
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