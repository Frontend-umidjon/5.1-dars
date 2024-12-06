// Массив с предустановленными данными
let persons = [
    {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        profession: "Engineer",
        gender: "Male",
        country: "USA"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        age: 28,
        profession: "Designer",
        gender: "Female",
        country: "Canada"
    }
];

// Получение элементов из DOM
const container = document.querySelector(".container");
const addButton = document.querySelector(".add-button");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const form = document.querySelector(".modal-content form");

// Функция для создания и добавления карточки
function createCard(person) {
    // Создание нового div элемента с классом 'card'
    const card = document.createElement("div");
    card.classList.add("card");

    // Вставка HTML содержимого карточки
    card.innerHTML = `
        <h2>${person.firstName} ${person.lastName}</h2>
        <ul>
            <li><strong>First Name:</strong> ${person.firstName}</li>
            <li><strong>Last Name:</strong> ${person.lastName}</li>
            <li><strong>Age:</strong> ${person.age}</li>
            <li><strong>Profession:</strong> ${person.profession}</li>
            <li><strong>Gender:</strong> ${person.gender}</li>
            <li><strong>Country:</strong> ${person.country}</li>
        </ul>
    `;

    // Добавление фотографии к карточке в зависимости от пола перед именем
    if (person.gender === "Male" || person.gender === "male") {
        card.innerHTML += '<img src="./assets/man.png" alt="Male">';
    } else {
        card.innerHTML += '<img src="./assets/woman.png" alt="Female">';
    }

    // Добавление новой карточки в контейнер
    container.appendChild(card);
}


// Добавление предустановленных карточек на страницу
persons.forEach((person) => {
    createCard(person);
});

// Функция для открытия модального окна
function openModal() {
    modal.classList.add("active");
}

// Функция для закрытия модального окна
function closeModal() {
    modal.classList.remove("active");
}

// Добавление слушателя события на кнопку "Add New Card"
addButton.addEventListener("click", openModal);

// Добавление слушателя события на кнопку "Close" модального окна
closeButton.addEventListener("click", closeModal);

// Обработка отправки формы
form.addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    // Получение значений из полей ввода и удаление пробелов
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const age = document.querySelector("#age").value.trim();
    const profession = document.querySelector("#profession").value.trim();
    const gender = document.querySelector("#gender").value.trim();
    const country = document.querySelector("#country").value.trim();

    // Проверка, чтобы все поля были заполнены
    if (!firstName || !lastName || !age || !profession || !gender || !country) {
        alert("Please fill out all fields.");
        return;
    }
    // Проверка, чтобы возраст был числом
    if (isNaN(age)) {
        alert("Age must be a number.");
        return;
    }

    // Проверка, чтобы возраст был больше 0
    if (age <= 0) {
        alert("Age must be greater than 0.");
        return;
    }
    // Проверка, чтобы пол был "Male" или "Female"
    if (gender !== "Male" && gender !== "Female" && gender !== "male" && gender !== "female") {
        alert("Gender must be 'Male' or 'Female'.");
        return;
    }

    // Создание объекта нового человека
    const newPerson = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        profession: profession,
        gender: gender,
        country: country
    };

    // Добавление новой карточки на страницу
    createCard(newPerson);

    // Добавление нового человека в массив persons (опционально)
    persons.push(newPerson);

    // Закрытие модального окна
    closeModal();

    // Очистка формы после отправки
    form.reset();
});
