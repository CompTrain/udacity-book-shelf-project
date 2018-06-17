import React from 'react'
// import {BrowserRouter} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import CurrentlyReadingShelf from './Shelves/CurrentlyReading';
import WantToReadShelf from './Shelves/WantToRead';
import ReadShelf from './Shelves/Read';
import './App.css';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        // showSearchPage: false,
        currentlyReadingBooks: [],
        wantToReadBooks: [],
        readBooks: []

    };

    async componentDidMount() {

        BooksAPI.getAll().then((books) => {

            console.log(books);

            this.setState(() => {
                return { currentlyReadingBooks: books.filter(book => book.shelf === 'currentlyReading') };
            });

            this.setState(() => {
                return { wantToReadBooks: books.filter(book => book.shelf === 'wantToRead') };
            });

            this.setState(() => {
                return { readBooks: books.filter(book => book.shelf === 'read') };
            });
        });
    }

    render() {
        return (

            <div className="list-books">
                <div className="list-books-title">
                    <h1>My Book Shelf</h1>
                </div>
                <div className="list-books-content">
                    <div>

                        <CurrentlyReadingShelf
                            books={this.state.currentlyReadingBooks}
                        />
                        <WantToReadShelf
                            books={this.state.wantToReadBooks}
                        />
                        <ReadShelf
                            books={this.state.readBooks}
                        />

                    </div>
                </div>
            </div>
        )

    }
}

export default BooksApp
