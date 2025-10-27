import { useRef } from "react";

function App() {
  // useRef 훅은 함수 컴포넌ㅌ에서 ref라는 속성을 쉽게 사용할 수 있도록 도와주는 도구
  // react의 useRef는 컴포넌트 내에서 변하지 않는 값을 유지하거나 DOM 요소에 직접 접근할 때 사용하는 훅입니다.
  // 다른 react hook과 목적이 다름

  // useRef는 값을 저장하거나 DOM에 접근하기 위해 사용하는 객체(참조값)를 생성하는 Hook입니다.
  // 저장된 값은 컴포넌트가 리렌더링 되어도 유지되며, 값이 바뀌어도 리렌더링을 일으키지 않습니다.

  // ref라는 속성은 JSX, TSX 요소나 컴포넌트에 참조를 연결하는 역할
  const inputElement = useRef<HTMLInputElement | null>(null);
  const fileInputElement = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputElement.current?.focus();
    fileInputElement.current?.click();
  };

  return (
    <div>
      <input type="text" ref={inputElement} />
      <input type="file" ref={fileInputElement} />
      <button onClick={handleClick}>등록</button>
    </div>
  );
}

export default App;
