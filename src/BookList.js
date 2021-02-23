import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './utils/BooksAPI'
import ErrorBoundary from './ErrorBoundary'

const categories = ['Currently Reading', 'Want to Read', 'Read']

class BookList extends React.Component {
  state = {
    loading: false
  }

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    this.setState({loading: true})

    BooksAPI.getAll().then(result => {
      this.props.onAddBooks(result)
      this.setState({loading: false})

      localStorage.setItem('books', JSON.stringify(result))
    })
  }

  render() {
    return (
          <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <ErrorBoundary>
                {categories.map((category, index) => {
                    return <BookShelf 
                              books= {this.props.books}
                              loading= {this.state.loading}
                              onUpdate= {this.props.onUpdate}
                              onAddBooks= {this.props.onAddBooks}
                              category= {category} 
                              key= {index}
                            />
                  }) 
                }
              </ErrorBoundary>
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
