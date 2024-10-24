// 버튼 요소 배열 생성
const buttons = document.querySelectorAll(".button");

// 버튼 클릭 이벤트 콜백 함수 선언
const handleButtonClick = (event) => {
  console.log(event.target.innerText);
};

// 모든 버튼 요소에 이벤트 등록
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

/** 이벤트 위임을 활용한 이벤트 등록
 * const buttons = document.querySelector(".buttons");
 *
 * buttons.addEventListener("click", handleButtonClick);
 */
