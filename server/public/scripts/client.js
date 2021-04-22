$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons
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
  for(let i = 0; i < response.length; i += 1) {
      // let book = books[i];
    $('#bookShelf').append(`
      <tr>
        <td>${response[i].title}</td>
        <td>${response[i].author}</td>
        <td>
            <button class="read-up" data-id="${response[i].id}">Read</button>
            <button class="read-down" data-id"${response[i].id}">Unread</button>
        </td>
        <td>
            <button class="delete-book" data-id"${response[i].id}">Delete!</button>
      </tr>
    `);
  }
//    renderBooks(response);
//  })
//  .catch(function(error){
//    console.log('error in GET', error);
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
