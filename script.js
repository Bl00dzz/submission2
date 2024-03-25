// Mendapatkan elemen-elemen yang diperlukan
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const isCompleteInput = document.getElementById('isComplete');
const unreadBooksList = document.getElementById('unread-books-list');
const readBooksList = document.getElementById('read-books-list');
const MOVED_EVENT = "moved-book";

// Mendefinisikan fungsi untuk membuat elemen buku
function createBookElement(title, author, year, isComplete) {
    const timestamp = +new Date(); // Mendapatkan timestamp saat ini
    const bookElement = document.createElement('li');
    bookElement.setAttribute('id', `book-${timestamp}`); // Menambahkan ID dengan timestamp

    bookElement.innerHTML = `<strong>${title}</strong> - ${author} ${year}<button class="delete-button">Hapus</button>`;

    bookElement.querySelector('.delete-button').addEventListener('click', () => {
        bookElement.remove();
        saveBooksToLocalStorage();
    });

    if (isComplete) {
        readBooksList.append(bookElement);
    } else {
        unreadBooksList.append(bookElement);
    }
}

// Mendefinisikan fungsi untuk memindahkan buku ke status "telah selesai dibaca"
function markBookAsComplete(bookElement) {
    const title = bookElement.querySelector('strong').textContent;
    const author = bookElement.textContent.split('-')[1].trim();
    const year = bookElement.textContent.split('(')[1].split(')')[0].trim();

    bookElement.remove();
    createBookElement(title, author, year, true);
    saveBooksToLocalStorage();
}

// Mendefinisikan fungsi untuk memindahkan buku ke status "belum selesai dibaca"
function markBookAsUnread(bookElement) {
    const title = bookElement.querySelector('strong').textContent;
    const author = bookElement.textContent.split('-')[1].trim();
    const year = bookElement.textContent.split('(')[1].split(')')[0].trim();

    bookElement.remove();
    createBookElement(title, author, year, false);
    saveBooksToLocalStorage();
}

document.addEventListener(MOVED_EVENT, () => {
    const elementCustomAlert = document.createElement("div");
    elementCustomAlert.classList.add("alert");
    elementCustomAlert.innerText = "Berhasil Dipindahkan!";

    document.body.insertBefore(elementCustomAlert, document.body.children[0]);
    setTimeout(() => {
        elementCustomAlert.remove();
    }, 2000);
});


// Mendefinisikan fungsi untuk menambahkan buku
function addBook(title, author, year, isComplete) {
    createBookElement(title, author, year, isComplete);
    saveBooksToLocalStorage();
}

// Mendefinisikan fungsi untuk menyimpan daftar buku ke localStorage
function saveBooksToLocalStorage() {
    const unreadBooks = Array.from(unreadBooksList.children).map(bookElement => {
        const title = bookElement.querySelector('strong').textContent;
        const author = bookElement.textContent.split('-')[1].trim();
        const year = bookElement.textContent.split('(')[1].split(')')[0].trim();
        return { title, author, year, isComplete: false };
    });

    const readBooks = Array.from(readBooksList.children).map(bookElement => {
        const title = bookElement.querySelector('strong').textContent;
        const author = bookElement.textContent.split('-')[1].trim();
        const year = bookElement.textContent.split('(')[1].split(')')[0].trim();
        return { title, author, year, isComplete: true };
    });

    const books = [...unreadBooks, ...readBooks];
    localStorage.setItem('books', JSON.stringify(books));
}

// Mendefinisikan fungsi untuk memuat daftar buku dari localStorage
function loadBooksFromLocalStorage() {
    const books = JSON.parse(localStorage.getItem('books')) || [];

    books.forEach(book => {
        createBookElement(book.title, book.author, book.year, book.isComplete);
    });
}

// Memuat daftar buku saat halaman dimuat
loadBooksFromLocalStorage();

// Menangani submit form untuk menambahkan buku
bookForm.addEventListener('submit', event => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const year = yearInput.value;
    const isComplete = isCompleteInput.checked;

    addBook(title, author, year, isComplete);

    titleInput.value = '';
    authorInput.value = '';
    yearInput.value = '';
    isCompleteInput.checked = false;
});

// Menangani klik pada tombol "Selesai Dibaca" pada buku yang belum selesai dibaca
unreadBooksList.addEventListener('click', event => {
    if (event.target.classList.contains('complete-button')) {
        const bookElement = event.target.closest('li');
        markBookAsComplete(bookElement);
    }
});

// Menangani klik pada tombol "Belum Selesai Dibaca" pada buku yang telah selesai dibaca
readBooksList.addEventListener('click', event => {
    if (event.target.classList.contains('unread-button')) {
        const bookElement = event.target.closest('li');
        markBookAsUnread(bookElement);
    }
});