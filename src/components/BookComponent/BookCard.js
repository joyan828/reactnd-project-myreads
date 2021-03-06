import React from 'react'
import PropTypes from 'prop-types'
import noImage from '../../icons/noimage.png'
import * as BooksAPI from '../../utils/BooksAPI'

class BookCard extends React.Component {
  static propTypes = {
    book: PropTypes.object,
    onUpdate: PropTypes.func
  }

  state = {
    loading: false
  }

  requestBookUpdate = (givenBook, shelf) => {
    this.setState({ loading: true })

    BooksAPI.update(givenBook, shelf).then(result => {
      if(result && !result.error) {
        const copiedObj = Object.assign({}, givenBook)
        copiedObj.shelf = shelf

        this.setState({ loading: false }) 
        this.props.onUpdate(copiedObj)
        
      } else {
        this.setState({ loading: false }) 
        alert('An error occured. Please try it again.')
      }
    })
  }

  cutStringByCapital = string => {
    let regExp = /[A-Z]/
    let result;
    if(regExp.test(string)) {
      string.replace(/[A-Z]/, function(upp, i, st) {
        result = st.substr(0, i).toUpperCase()
      })
    } else{
      result = string.toUpperCase()
    }
    
    return result
  }

  render() {
    const { book } = this.props;
    
    return (
        <li>
          <div className="book">
              <div className="book-top">   
                <div className="book-cover-wrapper">
                  { book.imageLinks 
                    ? <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                    : <div className="book-cover" style={{ background: `url(${noImage}) center/100px no-repeat`}}></div>
                  }
                  { this.state.loading &&
                    <div className="book-cover-loading"></div>
                  }
                  { window.location.pathname === '/search' && book.shelf && book.shelf !== "none" &&
                    <div className="book-cover-mark">{this.cutStringByCapital(book.shelf)}</div>
                  }
                </div>
             
                <div className="book-shelf-changer">
                    <form>
                      <select value={book.shelf ? book.shelf : 'none'} onChange={ event => this.requestBookUpdate(book, event.target.value, )}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </form>
                </div>
              </div>
              <div className="book-title">{book.title}</div>

              {book.authors && book.authors.map((author, idx) => (
                <div className="book-authors" key={idx}>{author}</div>
              ))}

          </div>
        </li>
    )
  }
}

export default BookCard
