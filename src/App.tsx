import { useMemo, useState } from "react";

const getAverage = (numbers: number[]) => {
  console.log("평균 값을 계산 중입니다.");

  if (numbers.length === 0) return 0;

  const sum = numbers.reduce((acc, curr) => acc + curr);
  return sum / numbers.length;
};

function App() {
  const [list, setList] = useState<number[]>([]);
  const [number, setNumber] = useState<string>("");
  // input 태그에 입력된 값이기 떄문에 데이터 타입은 string

  const onInsert = () => {
    // concat: Array 인스턴스의 concat 함수는 두 개 이상의 배열을 병합하는 데 사용. 이 메서드는 기존 배열 변경하지않고, 새 배열을 반환
    const newList = list.concat(parseInt(number));
    setList(newList);
    setNumber("");
  };

  const average = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
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
