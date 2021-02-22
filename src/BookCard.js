import React from 'react'
import noImage from './icons/noimage.png';
import * as BooksAPI from './utils/BooksAPI'

class BookCard extends React.Component {
  state = {
    loading: false
  }

  requestBookUpdate = (givenBook, shelf) => {
    this.setState({ loading: true })

    BooksAPI.update(givenBook, shelf).then(result => {
      if(result) {
        givenBook.shelf = shelf;  
        
        this.setState({ loading: false }) 
        this.props.onUpdate(givenBook)
      }
    })
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
                  { book.shelf && <div className="book-cover-mark">{book.shelf}</div>}
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
