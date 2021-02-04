import React from 'react'
import './styles/App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BookList from './BookList'
import Search from './Search'

class BookApp extends React.Component {
  state = {
    books : []
  }

  handleResetBooks = () => {
    this.setState({books : []})
  }

  fetchBooks = () => {
    BooksAPI.getAll().then(result => {
      // console.log(result);
      this.setState({
        books: result
      })
    })
  }

  updateBook = (givenBook, shelf) => {
    BooksAPI.update(givenBook, shelf).then(result => {
      if(result) {
        givenBook.shelf = shelf; // not recommanded?

        this.setState(prevState => ({
          books: prevState.books.filter(book=> book.id !== givenBook.id).concat([givenBook])
        }))
      }
    })
  }

  searchBooks = query => {
    // console.log(query)
    BooksAPI.search(query).then(result => {
      if(result.error) {
        console.log('result.error')
        this.handleResetBooks();
      } else {
        console.log('result.error X')
        console.log(result);
        this.setState({
          books: result
        })
      }
    })
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList 
            books={books} 
            fetchBooks={this.fetchBooks} 
            onUpdate={this.updateBook}
          />
        )} />
        <Route path='/search' render={() => (
          <Search 
            books={books}
            onReset={this.handleResetBooks} 
            onSearch={this.searchBooks}
            onUpdate={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BookApp
