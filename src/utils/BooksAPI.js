
const api = "https://reactnd-books-api.udacity.com"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

const handleError = (error) => {
  if (error.message === 'Network Error' && !error.response) {
        alert('Network error - make sure API is running!');
      }
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)
    .catch(error => handleError(error))


    // axios.interceptors.response.use(undefined, error => {
    //   if (error.message === 'Network Error' && !error.response) {
    //     toast.error('Network error - make sure API is running!');
    //   }
    //   const { status, data, config } = error.response;
    //   if (status === 404) {
    //     history.push('/notfound');
    //   }
    //   if (
    //     status === 400 &&
    //     config.method === 'get' &&
    //     data.errors.hasOwnProperty('id')
    //   ) {
    //     history.push('/notfound');
    //   }
    //   if (status === 500) {
    //     toast.error('Server error - check the terminal for more info!');
    //   }
    //   throw error.response;
    // });
    