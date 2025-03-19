let counter = 0;

function button_left_handler() {
  counter -= 1;
  if (counter < 0) counter = 4;
  button_handler();
}

function button_right_handler() {
  counter += 1;
  if (counter > 4) counter = 0;
  button_handler();
}

function button_handler() {
  const mathematics_image = document.querySelector("#mathematics_image");
  const science_image = document.querySelector("#science_image");
  const chemistry_image = document.querySelector("#chemistry_image");
  const physics_image = document.querySelector("#physics_image");
  const technology_image = document.querySelector("#technology_image");
  const text = document.querySelector("#classroom_title");
  const all_subjects_images = document.querySelectorAll(".subject_image");
  for (let i = 0; i < all_subjects_images.length; i++) {
    hideDiv(all_subjects_images[i]);
  }
  if (counter == 0) {
    mathematics_image.classList.remove("hidden");
    text.textContent = "Matematica";
  } else if (counter == 1) {
    technology_image.classList.remove("hidden");
    text.textContent = "Informatica";
  } else if (counter == 2) {
    chemistry_image.classList.remove("hidden");
    text.textContent = "Chimica";
  } else if (counter == 3) {
    science_image.classList.remove("hidden");
    text.textContent = "Scienze della Terra e biologia";
  } else {
    physics_image.classList.remove("hidden");
    text.textContent = "Fisica";
  }
}
function hideDiv(div) {
  div.classList.add("hidden");
}

const button_left = document.querySelector("#left");
button_left.addEventListener("click", button_left_handler);
const button_right = document.querySelector("#right");
button_right.addEventListener("click", button_right_handler);
