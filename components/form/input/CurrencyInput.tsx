// import dynamic from "next/dynamic";
import React, { useState } from "react";

// Components
import {
  Select,
  Group,
  Text,
  SelectProps,
  TextInput,
  Input,
} from "../../components";

// Types
import { FormBuilder } from "../../../types/Form";
import { CurrencyInput } from "../../../types/FormType";
import { CurrencyCodes } from "../../../constants/currency";
import useForm from "../../../hooks/useForm";

// const CurrencyFlag = dynamic(() => import("./currency/Currency"), {
//   loading: () => <h1>Loading</h1>,
// });
import CurrencyFlagLogo from "./currency/Currency";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const currencyList: Array<{ label: string }> = [];
CurrencyCodes.forEach((c) => currencyList.push({ label: c }));

function CurrencyInput({
  renderElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  renderElement: CurrencyInput;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}) {
  const {
    error,
    visible,
    inputState,
    captureCurrencyInputChange,
    setBlur,
    setKeyDown,
  } = useForm({
    formElement: renderElement,
    basePath,
    formKey,
    formBuilderSchema,
  });

  const handleValueChange = (value: string) => {
    const newValue = inputState.split(" ")[0] + " " + value;
    captureCurrencyInputChange(newValue);
  };

  const handleCurrencyChange = (curr: string) => {
    const value = inputState ? inputState.split(" ") : "INR";
    const newValue = curr + (value.length > 1 ? " " + value[1] : "");
    captureCurrencyInputChange(newValue);
    setKeyDown(true);
  };

  const CurrencyComponent = ({ curr }: { curr: string }) => {
    return (
      <div className="cursor-pointer">
        <Group noWrap className="mt-1 mb-1">
          <CurrencyFlagLogo currency={curr} />
          <Text size="sm">{curr}</Text>
        </Group>
      </div>
    );
  };

  const SelectCurrency = ({ label, description, ...others }: ItemProps) => {
    return (
      <div {...others}>
        <Group noWrap>
          <div>
            <CurrencyComponent curr={label} />
          </div>
        </Group>
      </div>
    );
  };

  const CurrencyDropdown = () => {
    return (
      <div>
        <Select
          itemComponent={SelectCurrency}
          data={CurrencyCodes}
          searchable
          value={inputState ? inputState.split(" ")[0] : "INR"}
          onChange={(value) => handleCurrencyChange(value || "INR")}
          className="cursor-pointer w-[100px]"
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          maxDropdownHeight={200}
          defaultValue={renderElement.initialValue?.currency || "INR"}
          nothingFound="Nothing found"
          filter={(value, item) => {
            return item.label
              ?.toLowerCase()
              .includes(value.toLowerCase().trim())
              ? true
              : false;
          }}
        />
      </div>
    );
  };

  return (
    <>
      {visible && (
        <div>
          <Input.Label
            className="font-bold"
            required={(renderElement.required as boolean) || false}
          >
            {renderElement.label}
          </Input.Label>
          <Input.Description className="mb-1">
            {renderElement.description}
          </Input.Description>
          <div className="flex">
            <CurrencyDropdown />
            <TextInput
              value={
                inputState
                  ? inputState.split(" ").length > 1
                    ? inputState.split(" ")[1]
                    : ""
                  : ""
              }
              onKeyDown={() => setKeyDown(true)}
              onBlur={(e) => setBlur(true)}
              onChange={(e) => handleValueChange(e.target.value.toString())}
              type="number"
              className="w-full"
            />
          </div>
          <Input.Error className="mt-1">{error}</Input.Error>
        </div>
      )}
    </>
  );
}

export default CurrencyInput;
