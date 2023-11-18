import React from "react";
import { useState } from "react";
import { FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stringStyles from "./string.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/hooks";
import { TString } from "../../types/common-types";
import { sortArray } from "./string-algorithm";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";



export const StringComponent: React.FC = () => {

  const { values, handleChange } = useForm({ value: "" });
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState<TString[]>([]);

  const onClick = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setLoader(true);
    const array = Array.from(values.value);
    const arrayObj = array.map((value) => ({
      value,
      state: ElementStates.Default,
    })) as TString[];
    setState([...arrayObj]);
    await timeout(DELAY_IN_MS);
    sortArray(arrayObj, setState, setLoader);
  };


  return (
    <SolutionLayout title="Строка">
      <form className={stringStyles.input_box} onSubmit={onClick}>
        <Input
          maxLength={11}
          value={values.value}
          name="value"
          onChange={handleChange}
          isLimitText={true}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={loader}
          disabled={values.value ? false : true}
        />
      </form>
      <ul className={stringStyles.circle_box}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.state}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
