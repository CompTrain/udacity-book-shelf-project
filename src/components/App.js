import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI';
import Search from './Search';
import Shelf from './Shelf';
import './App.css';

class BooksApp extends React.Component {
    state = {
        books: []
    };

    /**
     * When the component mounts, get all of our books.
     */
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => {
                return { books: books };
            });
        });
    };

    /**
     * Move the selected book to the targeted shelf.
     *
     * @param event
     * @param book
     * @returns {Promise<void>}
     */
    moveBook = async (event, book) => {
        const newShelf = event.target.value;

        let books = this.state.books.reduce((accumulator, bookOnShelf) => {
            if (bookOnShelf.id === book.id) {
                bookOnShelf.shelf = newShelf;
            }

            accumulator.push(bookOnShelf);
            return accumulator;
        }, []);

        this.setState(() => ({
            books: books
        }));

        await BooksAPI.update(book, newShelf);
    };

    render() {
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>My Book Shelf</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <Shelf
                                    books={this.state.books}
                                    moveBook={this.moveBook}
                                    shelfTitle='Currently Reading'
                                    shelfTitleShort='currentlyReading'
                                />
                                <Shelf
                                    books={this.state.books}
                                    moveBook={this.moveBook}
                                    shelfTitle='Want To Read'
                                    shelfTitleShort='wantToRead'
                                />
                                <Shelf
                                    books={this.state.books}
                                    moveBook={this.moveBook}
                                    shelfTitle='Read'
                                    shelfTitleShort='read'
                                />
                            </div>

                            <div className="open-search">
                                <Link to='/search'>Add a book</Link>
                            </div>
                        </div>

                    </div>
                )} />

                <Route exact path='/search' render={() => (
                    <Search books={this.state.books} moveBook={this.moveBook} />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
