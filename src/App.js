import React from 'react'
import './styles/App.css'
import { Route } from 'react-router-dom';
import BookList from './BookList'
import Search from './Search'

class BookApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookList />
        )} />
         <Route path='/search' render={() => (
          <Search />
        )} />
      </div>
    )
  }
}

export default BookApp
