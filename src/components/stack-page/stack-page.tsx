import React from "react";
import { useState } from "react";
import { SyntheticEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stackPageStyles from "./stack-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { timeout } from "../../utils/utils";
import { TString } from "../../types/common-types";
import { useForm } from "../../hooks/hooks";
import { Stack } from "./stack-algorithm";
import { ElementStates } from "../../types/element-states";


export const StackPage: React.FC = () => {

  const { values, handleChange, setValues } = useForm({ value: "" });
  const [stack, setStack] = useState(new Stack<TString>());
  const [state, setState] = useState<TString[]>([]);
  const [addLoader, setAddLoader] = useState(false);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [clearLoader, setClearLoader] = useState(false);

  const onClick = async (text: string, evt: SyntheticEvent) => {
    evt.preventDefault();
    const arr = stack.getContainer();
    if (values.value !== "" && text === "Добавить") {
      setAddLoader(true);
      stack.push({ value: values.value, state: ElementStates.Changing });
      setStack(stack);
      setState([...arr]);
      setValues({ value: "" });
      await timeout(500);
      stack.peak()!.state = ElementStates.Default;
      setStack(stack);
      setState([...arr]);
      setAddLoader(false)
    } else if (text === "Очистить") {
      setClearLoader(true)
      const length = stack.getLength();
      let i = 0;
      for (i; i < length; i++) {
        stack.pop();
        setStack(stack);
      }
      setState([...arr]);
      setClearLoader(false)
    } else if (text === "Удалить") {
      setRemoveLoader(true);
      stack.peak()!.state = ElementStates.Changing;
      setStack(stack);
      setState([...arr]);
      await timeout(500);
      stack.pop();
      await timeout(500);
      setStack(stack);
      setState([...arr]);
      setRemoveLoader(false)
    }
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const arr = stack.getContainer();
    stack.push({ value: values.value, state: ElementStates.Changing });
    setStack(stack);
    setState([...arr]);
    setValues({ value: "" });
    await timeout(500);
    stack.peak()!.state = ElementStates.Default;
    setStack(stack);
    setState([...arr]);
  }

  return (
    <SolutionLayout title="Стек">
      <form className={stackPageStyles.input_box} onSubmit={onSubmit} >
        <Input
          maxLength={4}
          max={4}
          value={values.value}
          name="value"
          onChange={handleChange}
          type="string"
          extraClass={stackPageStyles.input}
          placeholder="Введите значение"
          isLimitText={true}
        />
        <div className={stackPageStyles.buttons_box}>
          <Button
            text="Добавить"
            type="button"
            isLoader={addLoader}
            onClick={(e) => onClick("Добавить", e)}
            disabled={values.value === "" ? true : false}
            linkedList="small"
          />
          <Button
            text="Удалить"
            type="button"
            isLoader={removeLoader}
            onClick={(e) => onClick("Удалить", e)}
            disabled={stack.getLength() > 0 ? false : true}
          />
          <Button
            text="Очистить"
            type="button"
            isLoader={clearLoader}
            extraClass={stackPageStyles.clear}
            onClick={(e) => onClick("Очистить", e)}
            disabled={stack.getLength() > 0 ? false : true}
          />
        </div>
      </form>
      <ul className={stackPageStyles.circle_box}>
        {state?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.value}
              state={item.state}
              index={index}
              head={stack.peak() === item ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
