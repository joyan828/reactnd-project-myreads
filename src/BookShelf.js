import React from 'react'
import Loading from './icons/loading.gif'
import BookCard from './BookCard'

class BookShelf extends React.Component {
  render() {
    const { books, category, onAddBooks, onUpdate, loading } = this.props;
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
                    category= {category}
                    onUpdate= {onUpdate}
                    onAddBooks= {onAddBooks}
                  />
                ))
              : <div>
                 { loading
                  ? <img src={Loading} alt="loading" width="150px"/>
                  : <p>No books available</p> 
                  }
              </div>
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
