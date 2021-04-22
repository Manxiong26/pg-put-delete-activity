$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons
  $(`#bookShelf`).on('click', '.read-up', putReadHandler);
  $(`#bookShelf`).on('click', '.read-down', putUnReadHandler);
  $(`#bookShelf`).on('click', '.delete-book', deleteBooks);
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });

}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
  for(let i = 0; i < response.length; i++) {
       let newList =
    $(`
      <tr>
        <td>${response[i].title}</td>
        <td>${response[i].author}</td>
        <td>
            <button class="read-up" data-id="${response[i].id}">Read</button>
            <button class="read-down" data-id"${response[i].id}">Unread</button>
        </td>
        <td>
            <button class="delete-book" data-id"${response[i].id}">Delete!</button>
        </td>
      </tr>
    `);
    newList.data('id', response[i].id);
    $(`#bookShelf`).append(newList)
  }
//    renderBooks(response);
//  })
//  .catch(function(error){
//    console.log('error in GET', error);
  });
}

function putReadHandler(){
  readOnBook($(this).data("id"), "up");
}

function putUnReadHandler(){
  readOnBook($(this).data("id"), "down");
}

function readOnBook(bookId, readDirection){
  $.ajax({
    method: 'PUT',
    url: `/awesomereads/books${bookId}`,
    data: {
        direction: readDirection
    }
  })
  .then( function(response){
    
    refreshBooks();
  })
  .catch(function( error) {
    alert(`Error on read on a book.`, error)
  });
}

function delteBooksHandler(){
  deleteBooks($(this).data("id"))
}

function deleteBooks(bookId){
  $.ajax({
    method: 'DELETE',
    url: `awesomereads/books/${bookId}`,
  })
  .then(function (response) {
    console.log('Deleted Book WOOT WOOT!', response);
    
    refreshBooks();
  })
  .catch(function (error) {
    alert(`Error on deleting book`, error)
  });
}
// Displays an array of books to the DOM
// function renderBooks(books) {
//   $('#bookShelf').empty();

//   for(let i = 0; i < books.length; i += 1) {
//     let book = books[i];
//     // For each book, append a new row to our table
//     $('#bookShelf').append(`
//       <tr>
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//       </tr>
//     `);
//   }
// }
