import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import BookCard from './BookCard'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <BookCard />
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
