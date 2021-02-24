import React from 'react'
import PropTypes from 'prop-types'
import BookCard from './BookCard'
import Loading from './Loading'

const BookShelf = props => {
  const { books, category, onUpdate, loading } = props;
  const booksPerCategory = books.length > 0 && books.filter(book => 
    book.shelf.toLowerCase() === category.toLowerCase().replace(/ /g, "")
  )

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {`${category} (${booksPerCategory && booksPerCategory.length > 0 ? booksPerCategory.length : 0})`}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          { booksPerCategory && booksPerCategory.length > 0 
            ? booksPerCategory
              .map(book => (
                <BookCard 
                  key= {book.id}
                  book= {book}
                  onUpdate= {onUpdate}
                />
              ))
            : <Loading 
                loading= {loading} 
              />
          }
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array,
  loading: PropTypes.bool,
  onUpdate: PropTypes.func,
  category: PropTypes.string
}


export default BookShelf
