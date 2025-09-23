const mainElement = document.querySelector(".main");
const editProfileButton = document.querySelector(".edit-button");
const addPlaceButton = document.querySelector(".add-button");
const profileName = document.querySelector(".profile-info__name");
const profileAboutMe = document.querySelector(".profile-info__about-me");
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

function createPopupElement() {
  const popupElement = popupTemplate.querySelector(".popup").cloneNode(true);
  popupElement
    .querySelector(".popup__close")
    .addEventListener("click", (evt) => {
      handleToggle(".popup", "popup_active");
      evt.target.closest(".popup").remove();
    });
  return popupElement;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = evt.target.querySelector(
    ".form-profile__input[name='profileName']"
  );
  let jobInput = evt.target.querySelector(
    ".form-profile__input[name='profileAboutMe']"
  );

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;

  handleToggle(".popup", "popup_active");
  evt.target.closest(".popup").remove();
}

function openEditProfilePopup() {
  const popupElement = createPopupElement();

  const profileFormElement = profileFormTemplate
    .querySelector(".form-profile")
    .cloneNode(true);
  profileFormElement.querySelector(
    ".form-profile__input[name='profileName']"
  ).value = profileName.textContent;
  profileFormElement.querySelector(
    ".form-profile__input[name='profileAboutMe']"
  ).value = profileAboutMe.textContent;
  profileFormElement.addEventListener("submit", handleProfileFormSubmit);
  popupElement.querySelector(".popup__container").append(profileFormElement);

  mainElement.append(popupElement);
  handleToggle(".popup", "popup_active");
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = evt.target.querySelector(
    ".form-place__input[name='placeName']"
  );
  let linkInput = evt.target.querySelector(
    ".form-place__input[name='placeLink']"
  );

  const newCard = {
    name: nameInput.value,
    link: linkInput.value,
    description: nameInput.value,
  };

  initialCards.push(newCard);
  cardsContainer.append(createCard(newCard));

  handleToggle(".popup", "popup_active");
  evt.target.closest(".popup").remove();
}

function openAddPlacePopup() {
  const popupElement = createPopupElement();

  const placeFormElement = placeFormTemplate
    .querySelector(".form-place")
    .cloneNode(true);
  placeFormElement.addEventListener("submit", handlePlaceFormSubmit);
  popupElement.querySelector(".popup__container").append(placeFormElement);

  mainElement.append(popupElement);
  handleToggle(".popup", "popup_active");
}

function openImagePopup(imgElement, titleElement) {
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
  cardElement.querySelector(".card__image").alt = propCard.description;
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__likes-button_active");
      openImagePopup(
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

editProfileButton.addEventListener("click", openEditProfilePopup);
addPlaceButton.addEventListener("click", openAddPlacePopup);
renderCards();
