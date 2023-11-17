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
import { ChangeEvent } from "react";


export const QueuePage: React.FC = () => {

  const { values, handleChange, setValues } = useForm({ value: "" })

  const [queue, setQueue] = useState(new Queue<TString>(7));

  let array = queue.getElements() as TString[];

  const initialArray = Array.from({ length: 7 }).map(() => ({ value: "", state: ElementStates.Default, })) as TString[];

  const [arr, setArr] = useState<TString[]>(initialArray);

  const onClick = async (text: string) => {
    if (values.value !== "" && text === "Добавить") {
      queue.enqueue({ value: values.value, state: ElementStates.Changing });
      setQueue(queue);
      setArr([...array]);
      await timeout(SHORT_DELAY_IN_MS);
      queue.getTail()!.state = ElementStates.Default;
      setValues({ value: "" });
      setArr([...array]);
    } else if (text === "Удалить") {
      queue.peak()!.state = ElementStates.Changing;
      setQueue(queue);
      setArr([...array]);
      await timeout(SHORT_DELAY_IN_MS);
      queue.dequeue();
      setQueue(queue);
      await timeout(SHORT_DELAY_IN_MS);
      setArr([...array]);
    } else if (text === "Очистить") {
      queue.clear();
      setQueue(queue);
      array = initialArray;
      setArr([...array]);
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={queuePageStyles.input_box}>
        <Input
          maxLength={4}
          value={values.value}
          name="value"
          type="string"
          onChange={handleChange}
        />
        <div className={queuePageStyles.buttons_box}>
          <Button
            text="Добавить"
            type="button"
            onClick={(e) => onClick("Добавить")}
            disabled={
              values.value === "" ||
                (!queue.isEmpty() && arr.slice(-1)[0] === queue.getTail())
                ? true : false}
          />
          <Button
            text="Удалить"
            type="button"
            onClick={(e) => onClick("Удалить")}
            disabled={!queue.isEmpty() ? false : true}
          />
          <Button
            text="Очистить"
            type="button"
            extraClass={queuePageStyles.clear}
            onClick={(e) => onClick("Очистить")}
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