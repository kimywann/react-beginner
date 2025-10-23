import { useState } from "react";

function App() {
  const [value, setValue] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const increment = () => setValue(value + 1);
  const decrement = () => setValue(value - 1);

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <div>
      <p>
        현재 카운터 값은: <b>{value}</b>
      </p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>

      <div>
        <input type="text" onChange={onChangeName} />
        <input type="text" onChange={onChangeNickname} />
      </div>

      <div>
        <b>이름:</b> {name}
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  );
}

export default App;
