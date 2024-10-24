// 버튼 요소 배열 생성
const buttons = document.querySelectorAll(".button");
// display 내부 요소 변수에 저장 및 내부 초기화
const display = document.querySelector(".calc-content");
display.innerText = "0";

// 버튼 클릭 이벤트 콜백 함수 선언
const handleButtonClick = (event) => {
  // 내부에 'number'가 있다면 숫자를 display에 도시
  if (Object.values(event.target.classList).includes("number")) {
    if (display.innerText === "0") display.innerText = "";
    display.innerText += event.target.innerText;
  }
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
