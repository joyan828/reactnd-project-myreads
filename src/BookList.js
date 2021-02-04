import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

const categories = ['Currently Reading', 'Want to Read', 'Read']

class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks()
  }

  render() {
    return (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {categories.map((category, index) => {
                  return <BookShelf 
                            onUpdate={this.props.onUpdate}
                            books={this.props.books}
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
