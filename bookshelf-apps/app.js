// Mendapatkan elemen form dan daftar rak buku
const inputForm = document.getElementById("inputBook");
const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
const completeBookshelfList = document.getElementById("completeBookshelfList");

// Fungsi untuk membuat elemen buku baru
function createBookElement(title, author, year, isComplete) {
    const bookElement = document.createElement("article");
    bookElement.classList.add("book_item");

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Penulis: ${author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Tahun: ${year}`;

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.innerText = "Hapus";
    deleteButton.addEventListener("click", function () {
        deleteBook(bookElement);
    });

    bookAction.appendChild(deleteButton);

    if (isComplete) {
        const uncompleteButton = document.createElement("button");
        uncompleteButton.classList.add("uncomplete");
        uncompleteButton.innerText = "Belum Selesai Dibaca";
        uncompleteButton.addEventListener("click", function () {
            uncompleteBook(bookElement);
        });

        bookAction.appendChild(uncompleteButton);
    } else {
        const completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerText = "Selesai Dibaca";
        completeButton.addEventListener("click", function () {
            completeBook(bookElement);
        });

        bookAction.appendChild(completeButton);
    }

    bookElement.appendChild(bookTitle);
    bookElement.appendChild(bookAuthor);
    bookElement.appendChild(bookYear);
    bookElement.appendChild(bookAction);

    return bookElement;
}

// Fungsi untuk menambahkan buku ke rak
function addBookToShelf(title, author, year, isComplete) {
    const bookElement = createBookElement(title, author, year, isComplete);

    if (isComplete) {
        completeBookshelfList.appendChild(bookElement);
    } else {
        incompleteBookshelfList.appendChild(bookElement);
    }
}

// Fungsi untuk menghapus buku dari rak
function deleteBook(bookElement) {
    bookElement.remove();
}

// Fungsi untuk memindahkan buku ke rak "Selesai dibaca"
function completeBook(bookElement) {
    const bookTitle = bookElement.querySelector("h3").innerText;
    const bookAuthor = bookElement.querySelector("p").innerText.split(": ")[1];
    const bookYear = bookElement.querySelectorAll("p")[1].innerText.split(": ")[1];

    deleteBook(bookElement);
    addBookToShelf(bookTitle, bookAuthor, bookYear, true);
}

// Fungsi untuk memindahkan buku ke rak "Belum selesai dibaca"
function uncompleteBook(bookElement) {
    const bookTitle = bookElement.querySelector("h3").innerText;
    const bookAuthor = bookElement.querySelector("p").innerText.split(": ")[1];
    const bookYear = bookElement.querySelectorAll("p")[1].innerText.split(": ")[1];

    deleteBook(bookElement);
    addBookToShelf(bookTitle, bookAuthor, bookYear, false);
}

// Event listener saat form disubmit
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    addBookToShelf(inputBookTitle, inputBookAuthor, inputBookYear, inputBookIsComplete);

    // Reset form setelah buku ditambahkan
    inputForm.reset();
});