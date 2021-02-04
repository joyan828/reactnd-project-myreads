import React from 'react'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'

class Search extends React.Component {
  state = {
    query : ''
  }

  componentDidMount() {
    this.props.onReset()
  }

  handleChange = event => {
    this.setState({query: event.target.value})
  }

  handleSubmit = event => {
    this.props.onSearch(event.target.value)
  }

  handleFormReset = () => {
    this.setState({query: ''})
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
                    value={this.state.query}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        this.handleSubmit(e)
                        this.handleFormReset()
                      }
                    }}
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
                : <div>No results</div>
                }
              </ol>
            </div>
          </div>
    )
  }
}

export default Search
