"use client";

import { DatePickerInput, DateTimePicker } from "@mantine/dates";
import React, { ReactElement } from "react";
import dayjs from "dayjs";
import useForm from "../../../hooks/useForm";
import { FormBuilder } from "../../../types/Form";
import { DateTimeInput as DateTimeInputType } from "../../../types/FormType";

function stringToDate(dateString: string): Date | undefined {
  return dayjs(dateString).isValid() ? dayjs(dateString).toDate() : undefined;
}

export default function DateTimeInput({
  formElement,
  formKey,
  formBuilderSchema,
  basePath,
}: {
  formElement: DateTimeInputType;
  formKey: string;
  formBuilderSchema: FormBuilder;
  basePath: string;
}): ReactElement {
  const {
    inputState,
    captureDateTimeInputChange,
    error,
    visible,
    setBlur,
    setKeyDown,
  } = useForm({
    formElement,
    basePath,
    formKey,
    formBuilderSchema,
  });
  return (
    <React.Fragment>
      {visible && (
        <div className="mb-3 mt-3">
          {formElement.showTime ? (
            <DateTimePicker
              label={formElement.label}
              placeholder={
                (formElement.placeHolder as string) ||
                (formElement.label as string)
              }
              required={(formElement.required as boolean) || false}
              value={stringToDate(inputState)}
              minDate={
                formElement.minDate
                  ? stringToDate(formElement.minDate as string)
                  : undefined
              }
              maxDate={
                formElement.maxDate
                  ? stringToDate(formElement.maxDate as string)
                  : undefined
              }
              onChange={(date: Date) => {
                // convert to ISO format parse-able by dayjs
                captureDateTimeInputChange(
                  dayjs(date).format("YYYY-MM-DD HH:mm")
                );
              }}
              error={error}
              description={formElement.description || ""}
              onKeyDown={() => {
                setKeyDown(true);
              }}
              onBlur={(e: React.SyntheticEvent) => {
                setBlur(true);
              }}
            />
          ) : (
            <DatePickerInput
              label={formElement.label}
              placeholder={
                (formElement.placeHolder as string) ||
                (formElement.label as string)
              }
              required={(formElement.required as boolean) || false}
              value={stringToDate(inputState)}
              minDate={
                formElement.minDate
                  ? stringToDate(formElement.minDate as string)
                  : undefined
              }
              maxDate={
                formElement.maxDate
                  ? stringToDate(formElement.maxDate as string)
                  : undefined
              }
              onChange={(date: Date) => {
                // convert to ISO format parse-able by dayjs
                captureDateTimeInputChange(dayjs(date).format("YYYY-MM-DD"));
              }}
              error={error}
              description={formElement.description || ""}
              onKeyDown={() => {
                setKeyDown(true);
              }}
              onBlur={(e: React.SyntheticEvent) => {
                setBlur(true);
              }}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
}
