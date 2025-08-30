const formElement = document.querySelector(".form-profile");
const editProfileButton = document.querySelector(".edit-button");
const editProfileClose = document.querySelector(".edit-profile__close");
const profileName = document.querySelector(".profile-info__name");
const profileAboutMe = document.querySelector(".profile-info__about-me");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(
    ".form-profile__input[name='profileName']"
  );
  let jobInput = formElement.querySelector(
    ".form-profile__input[name='profileAboutMe']"
  );

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;

  handleToggleProfileEdit();
}

function handleToggleProfileEdit() {
  const editProfile = document.querySelector(".edit-profile");
  editProfile.classList.toggle("edit-profile_active");
}

function handleGetProfileInfo() {
  const nameInput = formElement.querySelector(
    ".form-profile__input[name='profileName']"
  );
  const jobInput = formElement.querySelector(
    ".form-profile__input[name='profileAboutMe']"
  );

  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;

  handleToggleProfileEdit();
}

editProfileButton.addEventListener("click", handleGetProfileInfo);
editProfileClose.addEventListener("click", handleToggleProfileEdit);
formElement.addEventListener("submit", handleProfileFormSubmit);
