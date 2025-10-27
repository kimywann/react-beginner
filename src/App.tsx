import { useCallback, useMemo, useState } from "react";

const getAverage = (numbers: number[]) => {
  console.log("평균 값을 계산 중입니다.");

  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((acc, curr) => acc + curr);
  return sum / numbers.length;
};

function App() {
  // useCallback은 useMemo와 비슷한 함수. 주로 렌더링 성능 최적화 하는 상황에서 사용
  // 이 훅은 만들어 놓았던 함수를 재사용 할 수 있다.

  // useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 전달하고,
  // 두 번째 파라미터에는 배열을 넣으면 된다.

  // onChange 처럼 비어있는 배열을 넣게 되면 컴포넌트가 렌더링 될 때, 만들었던 함수를 계혹해서 재사용하게 되며
  // onInsert 처럼 배열 안에 number와 list를 넣게 되면, 인풋 내용이 바뀌거나 새로운 항목이 추가 되었을 떼, 새로 만들어진 함수를 사용하게 됨.

  const [list, setList] = useState<number[]>([]);
  const [number, setNumber] = useState<string>("");
  // input 태그에 입력된 값이기 떄문에 데이터 타입은 string

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수를 생성한다.

  const onInsert = useCallback(() => {
    // concat: Array 인스턴스의 concat 함수는 두 개 이상의 배열을 병합하는 데 사용. 이 메서드는 기존 배열 변경하지않고, 새 배열을 반환
    const newList = list.concat(parseInt(number));
    setList(newList);
    setNumber(""); // number 상태 값 초기화
  }, [number, list]);

  // useCallback은 첫 렌더링 때 한 번만 함수 onInsert를 생성한다. ([])
  // onInsert 안에서 사용하는 list, number는 초기값의 복사본으로 함수안에 닫혀 (closed over) 있다.
  // 이후 number나 list가 변경되어도, onInsert는 옛날 값을 계속 사용한다.
  // 이게 클로저(closure) 문제이다.

  const average = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input type="text" value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>

      <ul>
        {list.map((item: number, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div>
        <b>평균 값: {average}</b>
      </div>
    </div>
  );
}

export default App;
