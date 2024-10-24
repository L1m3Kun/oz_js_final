const buttons = document.querySelectorAll(".button");

const handleButtonClick = (event) => {
  console.log(event.target.innerText);
};

// buttons.addEventListener("click", handleButtonClick);

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
