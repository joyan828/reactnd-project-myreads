import React from 'react'
import './styles/App.css'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import Search from './Search'

class BookApp extends React.Component {
  state = {
    books : []
  }

  handleResetBooks = () => {
    this.setState({books : []})
  }

  addBooks = array => {
    this.setState({books : array})
  }

  updateBook = givenBook => {
    this.setState(prevState => ({
      books: prevState.books.filter(book=> book.id !== givenBook.id).concat([givenBook])
    }))

    localStorage.setItem('books', JSON.stringify(this.state.books))
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList 
            books={books} 
            onAddBooks={this.addBooks}
            onUpdate={this.updateBook}
          />
        )} />
        <Route path='/search' render={() => (
          <Search 
            books={books}
            onReset={this.handleResetBooks} 
            onAddBooks={this.addBooks}
            onUpdate={this.updateBook}
          />
        )} />
      </div>
    )
  }
}

export default BookApp
