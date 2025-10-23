import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    // 해당 컴포넌트가 최초 렌더링 될 때, useEffect는 실행이 되고,
    // 우리가 선언한 state 상태값이 변경 되더라도 useEffect가 실행되는 것으로 보아
    // state 즉 상태 값이 변화하면 해당 컴포넌트는 재렌더링 된다는 것을 알 수 있음.
    console.log("컴포넌트가 렌더링 될 때 마다 특정 작업을 수행합니다.");
    console.log("name", name);
    console.log("nickname", nickname);
  });

  useEffect(() => {
    // 해당 컴포넌트가 최초 렌더링 될 때, useEffect는 실행이 되고,
    // 우리가 선언한 state 상태값이 변경 되더라도 useEffect가 실행되는 것으로 보아
    // state 즉 상태 값이 변화하면 해당 컴포넌트는 재렌더링 된다는 것을 알 수 있음.
    console.log("마운트가 될 때만 수행합니다. - 최초 1회 실시");
    console.log("name", name);
    console.log("nickname", nickname);
  }, []);

  useEffect(() => {
    // 해당 컴포넌트가 최초 렌더링 될 때, useEffect는 실행이 되고,
    // 우리가 선언한 state 상태값이 변경 되더라도 useEffect가 실행되는 것으로 보아
    // state 즉 상태 값이 변화하면 해당 컴포넌트는 재렌더링 된다는 것을 알 수 있음.
    console.log("name 상태값이 변할 경우에만 수행");
    console.log("name", name);
    console.log("nickname", nickname);
  }, [name]);

  useEffect(() => {
    console.log("뒷 정리하기");
    console.log("updatedname", name);

    return () => {
      console.log("clean up");
      console.log(name);
    };
  }, [name]);

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  return (
    <div>
      <div>
        <input type="text" value={name} onChange={onChangeName} />
        <input type="text" value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <b>이름:</b> {name}
        <b>닉네임:</b> {nickname}
      </div>
    </div>
  );
}

export default App;
