
const submit = document.getElementById("addBook");

//trigger to add book
submit.addEventListener('click', function(e) {
    e.preventDefault();
addBookToLibrary()
document.getElementById("myForm").reset();
});

//check if the array is already in localStorage, if not create empty array in localStorage
if (JSON.parse(localStorage.getItem("myLibrary") === null)) {
    let myLibrary = [
        {
          key: 1234567890,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          yearPrinted: 1960,
          readStatus: "read"
        },
        {
          key: 2345678901,
          title: "1984",
          author: "George Orwell",
          yearPrinted: 1949,
          readStatus: "unread"
        },
        {
          key: 3456789012,
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          yearPrinted: 1951,
          readStatus: "read"
        },
        {
          key: 4567890123,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          yearPrinted: 1813,
          readStatus: "read"
        },
        {
          key: 5678901234,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          yearPrinted: 1925,
          readStatus: "unread"
        },
        {
          key: 6789012345,
          title: "One Hundred Years of Solitude",
          author: "Gabriel Garcia Marquez",
          yearPrinted: 1967,
          readStatus: "read"
        },
        {
          key: 7890123456,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          yearPrinted: 1937,
          readStatus: "read"
        }
      ];
          localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
 }
let myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

//call buildCards in the event there is something in localStorage
buildCards();

//book object constructor
function Book(key, title, author, yearPrinted, readStatus)  {
    this.key = key;
    this.title = title
    this.author = author
    this.yearPrinted = yearPrinted
    this.readStatus = readStatus
}

//get data from form, use book constructor to add book to myLibrary. Then clear and rebuild card DOM
function addBookToLibrary() {
    let jsKey = Date.now();
    let jsTitle = document.getElementById('title').value;
    let jsAuthor = document.getElementById('author').value;
    let jsYear = document.getElementById('year').value;
    let jsStatus = document.getElementById('status').value;
    myLibrary.push(new Book(jsKey, jsTitle, jsAuthor, jsYear, jsStatus)); 
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    clearCards();
    buildCards();
}

// this clears the cards from the DOM before rebuilding
function clearCards() {
    const cardList = document.getElementById("projectCards");    
    while (cardList.hasChildNodes()) {
      cardList.removeChild(cardList.firstChild);
    }}

function updateBook () {
    // TODO add script to popup form for editing the book
}

function updateBookStatus (identifier) {
    let bookIndex = getIndex(identifier);
    if (myLibrary[bookIndex].readStatus == 'read') {
        myLibrary[bookIndex].readStatus = 'unread';
    }
    else myLibrary[bookIndex].readStatus = 'read'
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    clearCards();
    buildCards();
    // TODO script to update a book's status when the user toggles the read button
}

// this is used to get the index number of the book from the array
function getIndex (identifier) {
let bookIndex = myLibrary.findIndex(k => k.key == identifier);
return bookIndex
}

//called when the trash icon is clicked
function removeBook (identifier) { 
    let bookIndex = getIndex(identifier);
    myLibrary.splice(bookIndex,1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    clearCards();
    buildCards();
}

function elementFromHtml(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

function buildCards() {
    for (let i = 0; i < myLibrary.length; i++) {
        let cardLocation = document.getElementById('projectCards');
        cardLocation.appendChild(document.getElementById('cardTemplate').content.cloneNode(true));
        let updateId = document.getElementById('uidPlaceHolder');
        updateId.id = myLibrary[i].key;
        let updateTitle = document.getElementById('bookTitle');
        updateTitle.innerHTML = myLibrary[i].title;
        updateTitle.id = 'title' + myLibrary[i].key;
        let updateAuthor = document.getElementById('bookAuthor');
        updateAuthor.innerHTML = myLibrary[i].author;
        updateAuthor.id = 'author' + myLibrary[i].key;
        let updateYear = document.getElementById('bookYear');
        updateYear.innerHTML = myLibrary[i].yearPrinted;
        updateYear.id = 'year' + myLibrary[i].key;
        let updateDelete = document.getElementById('deleteBook');
        updateDelete.id = 'delete' + myLibrary[i].key;
        let updateStatus = document.getElementById('bookStatus');
        updateStatus.innerHTML = 'Auto_stories';
        if (myLibrary[i].readStatus === 'read') {
            updateStatus.innerHTML = 'Import_Contacts';}
        updateStatus.id = 'status' + myLibrary[i].key;
        document.querySelector('#delete' + myLibrary[i].key)
        .addEventListener('click',function(){
            removeBook(this.closest(".card").id);
        })
        document.querySelector('#status' + myLibrary[i].key)
        .addEventListener('click',function(){
        updateBookStatus(this.closest(".card").id);
        })
    }
}