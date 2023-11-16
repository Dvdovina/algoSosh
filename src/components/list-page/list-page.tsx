import React from "react";
import { SyntheticEvent } from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import listPageStyles from "./list-page.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { TString } from "../../types/common-types";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/hooks";
import { LinkedList } from "./list-algorithm";
import { timeout } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";



export const ListPage: React.FC = () => {

  const { values, handleChange, setValues } = useForm({ value: "" });

  const [index, setIndex] = useState<{ value: string; }>({ value: "" });

  const initialArr: TString[] = [
    { value: "0", state: ElementStates.Default },
    { value: "34", state: ElementStates.Default },
    { value: "8", state: ElementStates.Default },
    { value: "1", state: ElementStates.Default },
  ];

  const [list, setList] = useState(new LinkedList<TString>(initialArr));

  const [text, setText] = useState<string>("");

  const [loader, setLoader] = useState(false);

  const [string, setString] = useState<TString[]>(list.toArray());

  const [current, setCurrent] = useState<string>();

  const [head, setHead] = useState<string | React.ReactElement<any, string | React.JSXElementConstructor<any>>>("");

  const [tail, setTail] = useState<string | React.ReactElement<any, string | React.JSXElementConstructor<any>>>("");

  let indexNum = Number(index.value);

  const changeInputIndex = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setIndex({ ...index, [name]: value });
  };


  const addHeadOnClick = async () => {
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить в head");
      await timeout(SHORT_DELAY_IN_MS);
      list.prepend({ value: values.value, state: ElementStates.Modified });
      await timeout(SHORT_DELAY_IN_MS);
      setText("Добавить в head");
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      setList(list);
      await timeout(SHORT_DELAY_IN_MS);
      setString([...list.toArray()]);
      setHead("head");
      await timeout(SHORT_DELAY_IN_MS);
      list.toArray()[0].state = ElementStates.Default;
      setList(list);
      setString([...list.toArray()]);
      setCurrent("");
      setLoader(false);
      setValues({ value: "" });
    }
  };


  const deleteHeadOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить из head");
    setText("Удалить из head");
    setTail(
      <Circle
        letter={list.toArray()[0].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[0].value = "";
    await timeout(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setString([...list.toArray()]);
    setTail("");
    setText("");
    setCurrent("");
    setLoader(false);
  };


  const addTailOnClick = async () => {
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить в tail");
      await timeout(SHORT_DELAY_IN_MS);
      list.append({ value: values.value, state: ElementStates.Modified });
      await timeout(SHORT_DELAY_IN_MS);
      setText("Добавить в tail");
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      setList(list);
      await timeout(SHORT_DELAY_IN_MS);
      setString([...list.toArray()]);
      setHead("");
      await timeout(SHORT_DELAY_IN_MS);
      list.toArray()[string.length].state = ElementStates.Default;
      setList(list);
      setString([...list.toArray()]);
      setCurrent("");
      setValues({ value: "" });
      setLoader(false);
    }
  };


  const deleteTailOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить из tail");
    setText("Удалить из tail");
    setTail(
      <Circle
        letter={list.toArray()[string.length - 1].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[string.length - 1].value = "";
    await timeout(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setList(list);
    setString([...list.toArray()]);
    setTail("tail");
    setText("");
    setCurrent("");
    setLoader(false);
  };

  const addIndexOnClick = async () => {
    if (list.toArray().length < 6) {
      setLoader(true);
      setCurrent("Добавить по индексу");
      setText("Добавить по индексу");
      for (let i = 0; i <= indexNum; i++) {
        setIndex({ value: String(i) });
        await timeout(SHORT_DELAY_IN_MS);
        setHead(
          <Circle
            letter={values.value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        if (i < indexNum) {
          await timeout(SHORT_DELAY_IN_MS);
          list.toArray()[i].state = ElementStates.Changing;
          setList(list);
          setString([...list.toArray()]);
          await timeout(SHORT_DELAY_IN_MS);
        }
      }
      list.addByIndex({ value: values.value, state: ElementStates.Modified }, indexNum);
      setList(list);
      setString([...list.toArray()]);
      await timeout(SHORT_DELAY_IN_MS);
      const arr = list.toArray().map((value) => ({
        ...value,
        color: ElementStates.Default,
      })) as TString[];
      setList(list);
      setString([...arr]);
      setHead("");
      setCurrent("");
      setText("");
      setLoader(false);
      setValues({ value: "" });
      setIndex({ value: "" });
    }
  };

  const deleteIndexOnClick = async () => {
    setLoader(true);
    setCurrent("Удалить по индексу");
    setText("Удалить по индексу");

    for (let i = 0; i <= indexNum; i++) {
      setIndex({ value: String(i) });
      await timeout(SHORT_DELAY_IN_MS);
      if (i < indexNum) {
        await timeout(SHORT_DELAY_IN_MS);
        list.toArray()[i].state = ElementStates.Changing;
        setList(list);
        setString([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
      if (i === indexNum) {
        setTail(
          <Circle
            letter={list.toArray()[indexNum].value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        setList(list);
        setString([...list.toArray()]);
        list.toArray()[indexNum].value = "";
        setList(list);
        setString([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
    }
    list.deleteByIndex(indexNum);
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setString([...list.toArray()]);
    const defaultArray = list.toArray().map((value) => ({
      ...value,
      color: ElementStates.Default,
    })) as TString[];
    setList(list);
    setString([...defaultArray]);
    setTail("");
    setCurrent("");
    setText("");
    setLoader(false);
  };

  const showHead = (
    arr: TString[],
    current: string | undefined,
    index: number,
    text: string,
    head?: string | React.ReactElement | null,
    indexNum?: number
  ) => {
    if (current && text === "Добавить в head" && index === 0) {
      return head;
    } else if (current &&
      text === "Добавить по индексу" &&
      index === indexNum) {
      return head;
    } else if (current &&
      text === "Добавить в tail" &&
      index === arr.length - 1) {
      return head;
    } else if (index === 0) {
      return 'head'
    }
  };

  const showTail = (
    arr: TString[],
    index: number,
    text: string,
    tail?: string | React.ReactElement | null,
    indexNum?: number
  ) => {
    if (index === arr.length - 1 &&
      text === "Добавить в tail") {
      return 'tail';
    } else if (index === arr.length - 1 && text === "Добавить в head") {
      return "tail";
    } else if (index === 0 && text === "Удалить из head") {
      return tail;
    } else if (index === arr.length - 1 && text === "Добавить по индексу") {
      return 'tail';
    }
    else if (index === arr.length - 1 &&
      text === "Удалить из head") {
      return "tail";
    }
    else if (index === arr.length - 1 &&
      text === "Удалить из tail") {
      return tail;
    } else if (index === indexNum && text === "Удалить по индексу") {
      return tail;
    } else if (index === arr.length - 1) {
      return "tail";
    }
  };


  return (
    <SolutionLayout title="Связный список">
      <form className={listPageStyles.input_box}>
        <Input
          placeholder="Введите значение"
          maxLength={4}
          type="text"
          isLimitText={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          value={values.value}
          disabled={(loader ? true : false) || (list.toArray().length === 6 ? true : false)}
        />
        <Button
          text="Добавить в head"
          type="button"
          onClick={() => addHeadOnClick()}
          isLoader={current === "Добавить в head" && loader}
          disabled={values.value === "" ? true : false}
        />
        <Button
          text="Добавить в tail"
          type="button"
          onClick={() => addTailOnClick()}
          isLoader={current === "Добавить в tail" && loader}
          disabled={values.value === "" ? true : false}
        />
        <Button
          text="Удалить из head"
          type="button"
          onClick={() => deleteHeadOnClick()}
          isLoader={current === "Удалить из head" && loader}
          disabled={loader ? true : false}
        />
        <Button
          text="Удалить из tail"
          type="button"
          onClick={() => deleteTailOnClick()}
          isLoader={current === "Удалить из tail" && loader}
          disabled={loader ? true : false}
        />
      </form>
      <form className={listPageStyles.input_box}>
        <Input
          placeholder="Введите индекс"
          onChange={changeInputIndex}
          value={index.value}
          disabled={(loader ? true : false)}
          type="number"
          max={6}
          min={0}
          name="value"
        />
        <Button
          text="Добавить по индексу"
          type="button"
          onClick={() => addIndexOnClick()}
          isLoader={current === "Добавить по индексу" && loader}
          disabled={
            ((values.value === "" || index.value === "" || (list.toArray().length - 1) < Number(index.value)) ? true : false)
          }
        />
        <Button
          text="Удалить по индексу"
          type="button"
          onClick={() => deleteIndexOnClick()}
          disabled={index.value === "" || (list.toArray().length - 1) < Number(index.value) ? true : false}
          isLoader={current === "Удалить по индексу" && loader}
        />
      </form>

      <ul className={listPageStyles.list}>
        {string &&
          string?.map((item, index) => {
            return (
              <li key={index} className={listPageStyles.listItem}>
                <Circle
                  letter={item.value}
                  head={showHead(
                    string,
                    current,
                    index,
                    text,
                    head,
                    indexNum
                  )}
                  tail={showTail(
                    string,
                    index,
                    text,
                    tail,
                    indexNum
                  )}
                  state={item.state}
                  index={index}
                />
                {index < string.length - 1 ? <ArrowIcon /> : null}
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
