import React, { useState, Dispatch, SetStateAction } from 'react';
import * as yup from 'yup';
import { SignUpBox } from '@components/signUp/SignUpBox';

export enum InputId {
  name = 'name',
  email = 'email',
  newTldAlerts = 'newTldAlerts',
  upcomingTldAlerts = 'upcomingTldAlerts',
}

export interface SignUpData {
  [InputId.name]: string;
  [InputId.email]: string;
  [InputId.newTldAlerts]: boolean;
  [InputId.upcomingTldAlerts]: boolean;
}

const initialData: SignUpData = {
  [InputId.name]: '',
  [InputId.email]: '',
  [InputId.newTldAlerts]: true,
  [InputId.upcomingTldAlerts]: true,
};

const validationSchema: yup.ObjectSchema = yup.object().shape({
  [InputId.name]: yup.string().max(99, 'Your name is too long').required('Please enter your name'),
  [InputId.email]: yup
    .string()
    .max(99, 'Your email is too long')
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
  [InputId.newTldAlerts]: yup.boolean(),
  [InputId.upcomingTldAlerts]: yup.boolean(),
});

function onInputValueChange(inputId: InputId, value: unknown, setData: Dispatch<SetStateAction<SignUpData>>): void {
  setData((currentData: SignUpData) => ({ ...currentData, [inputId]: value }));
}

function onSubmit(data: SignUpData, setErrorMessage: Dispatch<SetStateAction<string | null>>): void {
  const validationError: yup.ValidationError | undefined = validateData(data);
  if (validationError) {
    setErrorMessage(validationError.message);
    return;
  }
  setErrorMessage(null);
  alert('Valid data ' + JSON.stringify(data));
}

function validateData(data: SignUpData): yup.ValidationError | undefined {
  try {
    validationSchema.validateSync(data);
  } catch (error) {
    return error;
  }
}

export const SignUpBoxContainer = () => {
  const [data, setData] = useState(initialData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <SignUpBox
      data={data}
      errorMessage={errorMessage}
      onInputValueChange={(inputId: InputId, value: unknown) => onInputValueChange(inputId, value, setData)}
      onSubmit={() => onSubmit(data, setErrorMessage)}
    />
  );
};
