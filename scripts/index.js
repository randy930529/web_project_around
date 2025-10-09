const mainElement = document.querySelector(".main");
const editProfileButton = document.querySelector(".edit-button");
const addPlaceButton = document.querySelector(".add-button");
const profilename = document.querySelector(".profile-info__name");
const profileAboutMe = document.querySelector(".profile-info__aboutMe");
const cardsContainer = document.querySelector(".places__cards");

const popupTemplate = document.querySelector("#popup-template").content;
const cardTemplate = document.querySelector("#card-template").content;
const profileFormTemplate = document.querySelector(
  "#form-profile-template"
).content;
const placeFormTemplate = document.querySelector(
  "#form-place-template"
).content;

const initialCards = [
  {
    name: "Statue of Liberty, New York",
    link: "./images/ari-dutilh.jpg",
    description: "A group of people standing around a statue of liberty",
  },
  {
    name: "New York",
    link: "./images/jean-estrella.jpg",
    description:
      "City with tall buildings under a white and blue sky during the day",
  },
  {
    name: "Monument Valley, Arizona",
    link: "./images/jonathan-ward.jpg",
    description: "U.S. flag near a gray concrete road",
  },
  {
    name: "Oregon, USA",
    link: "./images/clay-banks.jpg",
    description: "Man near the waterfall",
  },
  {
    name: "Mount Rushmore National Memorial, South Dakota",
    link: "./images/conner-baker.jpg",
    description: "A group of people walking in front of a mountain",
  },
  {
    name: "Horseshoe Bend, Arizona",
    link: "./images/david-evans.jpg",
    description:
      "A flag on a brown rock formation under the blue sky during the day",
  },
];

function handleToggle(classContainer, classToggle) {
  const container = document.querySelector(classContainer);
  container.classList.toggle(classToggle);
}

function closedPopupElementWhitClick(popupElement) {
  popupElement.addEventListener("click", (evt) => {
    handleToggle(".popup", "popup_active");
    evt.currentTarget.remove();
  });
  popupElement
    .querySelector(".popup__container")
    .addEventListener("click", (evt) => {
      evt.stopPropagation();
    });
}

function closedPopupElementWhitEsc(popupElement) {
  const handlePressESC = (evt) => {
    if (evt.key === "Escape") {
      handleToggle(".popup", "popup_active");
      popupElement.remove();
    }
    document.removeEventListener("keydown", handlePressESC);
  };
  document.addEventListener("keydown", handlePressESC);
}

function createPopupElement() {
  const popupElement = popupTemplate.querySelector(".popup").cloneNode(true);
  closedPopupElementWhitClick(popupElement);
  closedPopupElementWhitEsc(popupElement);
  return popupElement;
}

function upProfile(inputList) {
  inputList.forEach((input) => {
    const profileElement = document.querySelector(
      `.profile-info__${input.name}`
    );

    if (profileElement) {
      profileElement.textContent = input.value;
    }
  });
}

function createPlace(inputList) {
  const newPlace = {
    name: "",
    link: "",
    description: "",
  };

  inputList.forEach((input) => {
    newPlace[`${input.name}`] = input.value;
  });

  initialCards.push(newPlace);
  cardsContainer.append(createCard(newPlace));
}

function handleFormSubmit(evt, action) {
  evt.preventDefault();

  const inputList = Array.from(evt.target.querySelectorAll(".form__input"));
  action(inputList);

  handleToggle(".popup", "popup_active");
  evt.target.closest(".popup").remove();
}

function profileFormConfigurator(formElement) {
  formElement.querySelector(".form__input[name='name']").value =
    profilename.textContent;
  formElement.querySelector(".form__input[name='aboutMe']").value =
    profileAboutMe.textContent;
  formElement.addEventListener("submit", (evt) =>
    handleFormSubmit(evt, upProfile)
  );
}

function placeFormConfigurator(formElement) {
  formElement.addEventListener("submit", (evt) =>
    handleFormSubmit(evt, createPlace)
  );
}

function openPopupWhitForm(formTemplate, formConfigurator) {
  const popupElement = createPopupElement();
  const formElement = formTemplate.querySelector(".form").cloneNode(true);

  formConfigurator(formElement);

  popupElement.querySelector(".popup__container").append(formElement);
  mainElement.append(popupElement);
  enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__submit",
    inactiveButtonClass: "form__submit_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible",
  });
  handleToggle(".popup", "popup_active");
}

function openPopupWhitImage(imgElement, titleElement) {
  const popupElement = createPopupElement();

  imgElement.classList.add("card__image_popup");
  titleElement.classList.add("card__title_popup");
  popupElement
    .querySelector(".popup__container")
    .append(imgElement, titleElement);

  mainElement.append(popupElement);
  handleToggle(".popup", "popup_active");
}

function createCard(propCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__title").textContent = propCard.name;
  cardElement.querySelector(".card__image").src = propCard.link;
  cardElement.querySelector(".card__image").alt =
    propCard.description || propCard.name;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__likes-button_active");
      openPopupWhitImage(
        evt.target.cloneNode(true),
        cardElement.querySelector(".card__title").cloneNode(true)
      );
    });
  cardElement
    .querySelector(".card__likes-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__likes-button_active");
    });
  cardElement
    .querySelector(".card__trash-button")
    .addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });

  return cardElement;
}

function renderCards() {
  const cardsResult = initialCards.map((itemCard) => createCard(itemCard));
  cardsContainer.append(...cardsResult);
}

editProfileButton.addEventListener("click", () =>
  openPopupWhitForm(profileFormTemplate, profileFormConfigurator)
);
addPlaceButton.addEventListener("click", () =>
  openPopupWhitForm(placeFormTemplate, placeFormConfigurator)
);
renderCards();
