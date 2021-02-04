import React from 'react'
import BookCard from './BookCard'

class BookShelf extends React.Component {
  render() {
    const { books, category, onUpdate } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{category}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.length > 0 
              && books.filter(book => 
                  book.shelf.toLowerCase() === category.toLowerCase().replace(/ /g, "")
                )
                .map(book => (
                  <BookCard 
                    key= {book.id}
                    book= {book}
                    category= {category}
                    onUpdate={onUpdate}
                  />
                ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
