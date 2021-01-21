import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BookShelf from './BookShelf'

const categories = ['Currently Reading', 'Want to Read', 'Read']

class BookList extends React.Component {
  render() {
    return (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {categories.map((category, index) => {
                  return <BookShelf 
                    category={category} 
                    key={index}
                  />
                }) 
              }

                <div className="open-search">
                    <Link to='/search'>
                      <button>Add a book</button>
                    </Link> 
                </div>
            </div>
          </div>
    )
  }
}

export default BookList
