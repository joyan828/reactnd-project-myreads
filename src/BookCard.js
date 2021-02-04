import React from 'react'

class BookCard extends React.Component {
  render() {
    const { book, category, onUpdate } = this.props;
  
    return (
        <li>
          <div className="book">
              <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                <div className="book-shelf-changer">
                    <form>
                      <select value={book.shelf ? book.shelf : 'none'} onChange={ event => onUpdate(book, event.target.value, )}>
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
