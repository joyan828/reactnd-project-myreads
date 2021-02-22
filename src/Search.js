import React from 'react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import Loading from './icons/loading.gif'
import * as BooksAPI from './utils/BooksAPI'

class Search extends React.Component {
  state = {
    query : '',
    loading: false,
    error: false
  }

  componentDidMount() {
    this.props.onReset()
  }

  handleChange = event => {
    this.setState({query: event.target.value})
  }

  handleSubmit = event => {
    const query = event.target.value.trim();

    if(this.isValidate(query)) {
      this.searchBooks(query)
    } else {
      alert('Please check the keyword.')
    }
  }

  handleFormReset = () => {
    this.setState({query: ''})
  }

  isValidate = query => {
    let regExp = /[(a-zA-Z0-9)]/gi 
    if(regExp.test(query)) {
      return true;
    } 
  }

  searchBooks = query => {
    this.props.onReset() 
    this.setState({loading: true})

    BooksAPI.search(query).then(result => {
      if(result.error === "empty query") {
        this.props.onReset()

      } else if (result.error) {
        this.setState({error: true})

      } else {
        this.sortBooks(result)
        this.props.onAddBooks(result)
      }

      this.setState({loading: false})
    })
  }

  sortBooks = books => {
    const booksOnShelves = JSON.parse(localStorage.getItem('books'))
    for(const book of books) {
      for(const bookOnShelf of booksOnShelves) { 
        if(book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf
        }
      } 
    }

    return books
  }

  render() {
    const { books, onUpdate, onReset } = this.props;

    return (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
                <button className="close-search" onClick={onReset}>Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                  <input 
                    type="text" 
                    placeholder="Search by title or author"
                    onChange={this.handleChange}
                    onClick={this.handleFormReset}
                    value={this.state.query}
                    onKeyDown={(e) => e.key === "Enter" && this.handleSubmit(e)}
                  />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                
                {books.length > 0 
                ? books.map (book => (
                  <BookCard 
                    book={book}
                    key={book.id}
                    onUpdate={onUpdate}
                  />
                ))
                : <div>
                  { this.state.loading
                    ? <img src={Loading} alt="loading" width="150px"/>
                    : <div>No books available</div>
                  }
                </div>
                }
              </ol>
            </div>
          </div>
    )
  }
}

export default Search
