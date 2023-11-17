import React from "react";
import { useForm } from "../../hooks/hooks";
import { useState } from "react";
import { TString } from "../../types/common-types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import queuePageStyles from "./queue-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timeout } from "../../utils/utils";
import { Queue } from "./queue-page algorithm";
import { SyntheticEvent, FormEvent } from "react";


export const QueuePage: React.FC = () => {

  const { values, handleChange, setValues } = useForm({ value: "" })

  const [addLoader, setAddLoader] = useState(false);

  const [removeLoader, setRemoveLoader] = useState(false);

  const [clearLoader, setClearLoader] = useState(false);


  const [queue, setQueue] = useState(new Queue<TString>(7));

  let array = queue.getElements() as TString[];

  const initialArray = Array.from({ length: 7 }).map(() => ({ value: "", state: ElementStates.Default, })) as TString[];

  const [arr, setArr] = useState<TString[]>(initialArray);

  const onClick = async (text: string, evt: SyntheticEvent) => {
    evt.preventDefault();
    if (values.value !== "" && text === "Добавить") {
      setAddLoader(true);
      queue.enqueue({ value: values.value, state: ElementStates.Changing });
      setQueue(queue);
      setArr([...array]);
      await timeout(SHORT_DELAY_IN_MS);
      queue.getTail()!.state = ElementStates.Default;
      setValues({ value: "" });
      setArr([...array]);
      setAddLoader(false)
    } else if (text === "Удалить") {
      setRemoveLoader(true);
      queue.peak()!.state = ElementStates.Changing;
      setQueue(queue);
      setArr([...array]);
      await timeout(SHORT_DELAY_IN_MS);
      queue.dequeue();
      setQueue(queue);
      await timeout(SHORT_DELAY_IN_MS);
      setArr([...array]);
      setRemoveLoader(false)
    } else if (text === "Очистить") {
      setClearLoader(true)
      queue.clear();
      setQueue(queue);
      array = initialArray;
      setArr([...array]);
      setClearLoader(false)
    }
  };


  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    queue.enqueue({ value: values.value, state: ElementStates.Changing });
    setQueue(queue);
    setArr([...array]);
    await timeout(SHORT_DELAY_IN_MS);
    queue.getTail()!.state = ElementStates.Default;
    setValues({ value: "" });
    setArr([...array]);
  }

  return (
    <SolutionLayout title="Очередь">
      <form className={queuePageStyles.input_box} onSubmit={onSubmit}>
        <Input
          maxLength={4}
          value={values.value}
          name="value"
          type="string"
          onChange={handleChange}
          isLimitText={true}
          max={4}
        />
        <div className={queuePageStyles.buttons_box}>
          <Button
            text="Добавить"
            type="button"
            isLoader={addLoader}
            onClick={(e) => onClick("Добавить", e)}
            disabled={
              values.value === "" ||
                (!queue.isEmpty() && arr.slice(-1)[0] === queue.getTail())
                ? true : false}
          />
          <Button
            text="Удалить"
            type="button"
            isLoader={removeLoader}
            onClick={(e) => onClick("Удалить", e)}
            disabled={!queue.isEmpty() ? false : true}
          />
          <Button
            text="Очистить"
            type="button"
            isLoader={clearLoader}
            extraClass={queuePageStyles.clear}
            onClick={(e) => onClick("Очистить", e)}
            disabled={!queue.isEmpty() ? false : true}
          />
        </div>
      </form>
      <ul className={queuePageStyles.circle_box}>
        {arr?.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item?.value}
              state={item?.state}
              index={index}
              head={!queue.isEmpty() && queue.peak() === item ? "head" : ""}
              tail={!queue.isEmpty() && queue.getTail() === item ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};