import React from 'react'
// import {BrowserRouter} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import CurrentlyReadingShelf from './Shelves/CurrentlyReading';
import WantToReadShelf from './Shelves/WantToRead';
import ReadShelf from './Shelves/Read';
import './App.css';

class BooksApp extends React.Component {
    state = {
        // /**
        //  * TODO: Instead of using this state variable to keep track of which page
        //  * we're on, use the URL in the browser's address bar. This will ensure that
        //  * users can use the browser's back and forward buttons to navigate between
        //  * pages, as well as provide a good URL they can bookmark and share.
        //  */
        // // showSearchPage: false,
        // currentlyReadingBooks: [],
        // wantToReadBooks: [],
        // readBooks: []
        books: []
    };

    async componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => {
                return { books: books };
            });
        });
    }

    moveBook = async (event, book) => {
        const newShelf = event.target.value;
        let books = [ ...this.state.books ];

        for (let i = 0; i < books.length; i++) {
            if (books[i].id === book.id) {
                books[i].shelf = newShelf;
                break;
            }
        }

        this.setState(() => ({
            books: books
        }));

        await BooksAPI.update(book, newShelf);
    };


    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Book Shelf</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <CurrentlyReadingShelf
                            books={this.state.books}
                            moveBook={this.moveBook}
                        />
                        <WantToReadShelf
                            books={this.state.books}
                            moveBook={this.moveBook}
                        />
                        <ReadShelf
                            books={this.state.books}
                            moveBook={this.moveBook}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BooksApp
