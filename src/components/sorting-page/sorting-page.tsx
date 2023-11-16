import React from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingPageStyles from "./sorting-page.module.css"
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { randomArr } from "./sorting-page-algorithm";
import { TArray } from "../../types/common-types";
import { ChangeEvent } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { timeout, swap } from "../../utils/utils";
import { Column } from "../ui/column/column";


export const SortingPage: React.FC = () => {

  const [arr, setArr] = useState<TArray[]>(randomArr());
  const [radioBtn, setRadioBtn] = useState("choice");
  const [sorting, setSorting] = useState<Direction>();
  const [loader, setLoader] = useState(false);


  const onClick = () => {
    setArr(randomArr());
  };


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioBtn(e.target.value);
  };


  const sortChoice = async (arr: TArray[], sorting: Direction) => {
    for (let i = 0; i < arr.length; i++) {
      let index = i;
      for (let n = i + 1; n < arr.length; n++) {
        arr[i].state = ElementStates.Changing;
        arr[n].state = ElementStates.Changing;
        setArr([...arr]);
        await timeout(DELAY_IN_MS);
        if (sorting === Direction.Ascending) {
          if (arr[n].number < arr[index].number) {
            index = n;
            swap(arr, n, index);
            setArr([...arr]);
          }
        }
        if (sorting === Direction.Descending) {
          if (arr[n].number > arr[index].number) {
            index = n;
            swap(arr, n, index);
            setArr([...arr]);
          }
        }
        arr[n].state = ElementStates.Default;
        arr[i].state = ElementStates.Default;
        setArr([...arr]);
      }
      arr[index].state = ElementStates.Modified;
      swap(arr, i, index);
      setArr([...arr]);
    }
    setLoader(false);
  };


  const sortBubble = async (arr: TArray[], sorting: Direction) => {
    for (let i = 0; i < arr.length; i++) {
      for (let n = 0; n < arr.length - i - 1; n++) {
        arr[n].state = ElementStates.Changing;
        arr[n + 1].state = ElementStates.Changing;
        setArr([...arr]);
        await timeout(DELAY_IN_MS);
        if (sorting === Direction.Ascending) {
          if (arr[n].number > arr[n + 1].number) {
            swap(arr, n, n + 1);
          }
        }
        if (sorting === Direction.Descending) {
          if (arr[n].number < arr[n + 1].number) {
            swap(arr, n, n + 1);
          }
        }
        arr[n].state = ElementStates.Default;
        arr[n + 1].state = ElementStates.Default;
        setArr([...arr]);
      }
      const length = arr.length;
      arr[length - i - 1].state = ElementStates.Modified;
      setArr([...arr]);
    }
    setArr([...arr]);
    setLoader(false);
  };


  const sortOnClick = (sorting: Direction) => {
    setSorting(sorting);
    setLoader(true);
    if (radioBtn === "choice") {
      sortChoice(arr, sorting);
    } else {
      sortBubble(arr, sorting);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={sortingPageStyles.input_box}>
        <fieldset className={sortingPageStyles.radio}>
          <RadioInput
            label="Выбор"
            name="radioButton"
            value="choice"
            checked={radioBtn === "choice"}
            onChange={onChange}
          />
          <RadioInput
            label="Пузырёк"
            name="radioButton"
            value="bubble"
            checked={radioBtn === "bubble"}
            onChange={onChange}
          />
        </fieldset>
        <fieldset className={`${sortingPageStyles.sort_btns}`}>
          <Button
            sorting={Direction.Ascending}
            type="button"
            text="По возрастанию"
            isLoader={loader && sorting === Direction.Ascending}
            onClick={() => {
              sortOnClick(Direction.Ascending);
            }}
            disabled={loader}
          />
          <Button
            sorting={Direction.Descending}
            type="button"
            text="По убыванию"
            isLoader={loader && sorting === Direction.Descending}
            onClick={() => {
              sortOnClick(Direction.Descending);
            }}
            disabled={loader}
          />
        </fieldset>
        <Button text="Новый массив" onClick={onClick} disabled={loader} />
      </form>
      <ul className={sortingPageStyles.columns}>
        {arr &&
          arr?.map((item, index) => {
            return (
              <li key={index}>
                <Column index={item.number} state={item.state} />
              </li>
            );
          })}
      </ul>
    </SolutionLayout>
  );
};
