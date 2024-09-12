let books = [];

// Загрузка книг из localStorage при загрузке страницы
loadBooks();

// Отображение списка книг
displayBooks();

// Добавление новой книги
function addBook() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let year = document.getElementById("year").value;
    let genre = document.getElementById("genre").value;
    let status = document.getElementById("status").value;

    let newBook = {
        title: title,
        author: author,
        year: year,
        genre: genre,
        status: status
    };

    books.push(newBook);
    saveBooks();
    displayBooks();
    clearForm();
}

// Очистка формы
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("status").value = "прочитано";
}

// Отображение списка книг
function displayBooks(filteredBooks = books) { // Добавлена возможность передавать отфильтрованный массив
    let bookList = document.getElementById("book-list").getElementsByTagName("tbody")[0];
    bookList.innerHTML = "";

    for (let i = 0; i < filteredBooks.length; i++) { // Используем filteredBooks для отрисовки
        let book = filteredBooks[i];
        let row = bookList.insertRow();
        let titleCell = row.insertCell();
        let authorCell = row.insertCell();
        let yearCell = row.insertCell();
        let genreCell = row.insertCell();
        let statusCell = row.insertCell();
        let actionsCell = row.insertCell();

        titleCell.innerHTML = book.title;
        authorCell.innerHTML = book.author;
        yearCell.innerHTML = book.year;
        genreCell.innerHTML = book.genre;
        statusCell.innerHTML = book.status;

        actionsCell.innerHTML = `
            <button onclick="editBook(${i})">Редактировать</button>
            <button class="delete-btn" onclick="deleteBook(${i})">Удалить</button>
        `;
    }

    updateBookCount();
}

// Редактирование книги
function editBook(index) {
    let book = books[index];

    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("year").value = book.year;
    document.getElementById("genre").value = book.genre;
    document.getElementById("status").value = book.status;

    // Замена кнопки "Добавить" на кнопку "Сохранить"
    let addButton = document.querySelector(".add-book-form button");
    addButton.onclick = function() { saveBook(index); };
    addButton.innerHTML = "Сохранить";
}

// Сохранение отредактированной книги
function saveBook(index) {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let year = document.getElementById("year").value;
    let genre = document.getElementById("genre").value;
    let status = document.getElementById("status").value;

    books[index] = {
        title: title,
        author: author,
        year: year,
        genre: genre,
        status: status
    };

    saveBooks();
    displayBooks();
    clearForm();

    // Восстановление кнопки "Добавить"
    let addButton = document.querySelector(".add-book-form button");
    addButton.onclick = addBook;
    addButton.innerHTML = "Добавить";
}

// Удаление книги
function deleteBook(index) {
        books.splice(index, 1);
        saveBooks();
        displayBooks();
}

// Фильтрация книг по статусу
function filterBooks() {
    let statusFilter = document.getElementById("status-filter").value;

    let filteredBooks = books.filter(book => {
        return (statusFilter === "" || book.status === statusFilter);
    });

    displayBooks(filteredBooks); // Передаем отфильтрованный массив в displayBooks
}

// Обновление списка книг
function refreshList() {
    displayBooks();
}

// Удаление всех книг
function deleteAllBooks() {
        books = [];
        saveBooks();
        displayBooks();
}

// Обновление счетчика книг
function updateBookCount() {
    document.getElementById("book-count").innerHTML = books.length;
}

// Сохранение книг в localStorage
function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

// Загрузка книг из localStorage
function loadBooks() {
    let storedBooks = localStorage.getItem("books");
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
}