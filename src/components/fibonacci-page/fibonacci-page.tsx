import React from "react";
import { FormEvent } from "react";
import { useState } from "react";
import { useForm } from "../../hooks/hooks";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import fibonacciPageStyles from "./fibonaci-pade.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getNumbers, sortFibonacci } from "./fibonacci-algorithm";


export const FibonacciPage: React.FC = () => {

  const { values, handleChange } = useForm({ value: "" });
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState<string[]>([]);
  const index = Number(values.value);

  const onClick = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoader(true);
    const arrayNumbers = getNumbers(index).map(String);
    sortFibonacci(arrayNumbers, setState, setLoader);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={fibonacciPageStyles.input_box} onSubmit={onClick}>
        <Input
          max={19}
          min={1}
          value={values.value}
          name="value"
          onChange={handleChange}
          type="number"
          isLimitText={true}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={loader}
          disabled={
            values.value &&
              Number(values.value) < 20 &&
              Number(values.value) !== 0
              ? false
              : true
          }
        />
      </form>
      <ul className={fibonacciPageStyles.circle_box}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
