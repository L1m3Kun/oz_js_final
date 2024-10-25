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
          setState("firstOperand", first + second);
          return state.firstOperand;
        case "-":
          setState("firstOperand", first - second);
          return state.firstOperand;
        case "*":
          setState("firstOperand", first * second);
          return state.firstOperand;
        case "/":
          if (!second) return Number.MAX_SAFE_INTEGER;
          setState("firstOperand", first / second);
          return state.firstOperand;
        default:
          return state.firstOperand;
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

  const ClickHandler = {
    number(displayNumber) {
      if (display.innerText === "0" || state.isNew) {
        display.innerText = "";
        setState("isNew", false);
      }
      if (display.innerText !== "0" && state.isNew) {
        reset();
      }

      display.innerText += displayNumber;
    },

    operator(content) {
      if (state.firstOperand === null) {
        setState("firstOperand", parseFloat(display.innerText));
      } else {
        setState("secondOperand", parseFloat(display.innerText));
      }
      if (state.firstOperand && state.secondOperand) {
        display.innerText = calculate();
      }

      setState("operator", content);
      setState("isNew", true);
      console.log(state);
    },
    dot(content) {
      if (!display.innerText.includes(".")) {
        //.이 없을 때만 적용
        display.innerText += content;
      }
    },
    reset() {
      // C 버튼을 id를 통해 판별
      reset();
      display.innerText = "0";
    },
  };
  // 버튼 클릭 이벤트 콜백 함수 선언
  const handleButtonClick = (event) => {
    // 내부에 'number'가 있다면 숫자를 display에 도시
    if (Object.values(event.target.classList).includes("number")) {
      ClickHandler.number(event.target.innerText);
    } else if (event.target.id === "calc") {
      setState("secondOperand", parseFloat(display.innerText));
      display.innerText = calculate();
      console.log(state);
      reset();
      setState("isNew", true);
    } else if (event.target.id === "dot") {
      ClickHandler.dot(event.target.innerText);
    } else if (Object.values(event.target.classList).includes("operator")) {
      ClickHandler.operator(event.target.innerText);
    } else if (event.target.id === "reset") {
      ClickHandler.reset();
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
