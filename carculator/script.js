document.addEventListener("DOMContentLoaded", () => {
  // 버튼 요소 배열 생성
  const buttons = document.querySelectorAll(".button");
  // display 내부 요소 변수에 저장 및 내부 초기화
  const display = document.querySelector(".calc-content");
  display.innerText = "0";

  const useState = () => {
    const state = {
      firstOperand: null,
      secondOperand: null,
      operator: null,
      isNew: false,
    };
    const setState = (name, newValue) => {
      if (name in state) {
        state[name] = newValue;
      } else {
        new Error(`${name} is not in state`);
      }
    };
    const calculate = () => {
      const { firstOperand: first, secondOperand: second, operator } = state;
      switch (operator) {
        case "+":
          return first + second;
        case "-":
          return first - second;
        case "*":
          return first * second;
        case "/":
          if (!second) return Number.MAX_SAFE_INTEGER;

          return first / second;
        default:
          return 0;
      }
    };

    const reset = () => {
      state.firstOperand = null;
      state.isNew = false;
      state.operator = null;
      state.secondOperand = null;
    };
    return [state, setState, calculate, reset];
  };

  const [state, setState, calculate, reset] = useState();

  // 버튼 클릭 이벤트 콜백 함수 선언
  const handleButtonClick = (event) => {
    // 내부에 'number'가 있다면 숫자를 display에 도시
    if (Object.values(event.target.classList).includes("number")) {
      if (display.innerText === "0" || state.isNew) {
        display.innerText = "";
        setState("isNew", false);
      }
      display.innerText += event.target.innerText;
    } else if (Object.values(event.target.classList).includes("operator")) {
      if (event.target.id === "calc") {
        setState("secondOperand", Number(display.innerText));
        display.innerText = calculate();
      }
      if (state.firstOperand === null) {
        setState("firstOperand", Number(display.innerText));
      }
      setState("operator", event.target.innerText);
      setState("isNew", true);
      console.log(state);
    } else if (event.target.id === "dot") {
      // id로 버튼이 .인지 확인
      if (!display.innerText.includes(".")) {
        //.이 없을 때만 적용
        display.innerText += event.target.innerText;
      }
    } else if (event.target.id === "reset") {
      // C 버튼을 id를 통해 판별
      reset();
      display.innerText = "0";
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
});
