import React, { useState, Dispatch, SetStateAction } from 'react';
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
  [InputId.newTldAlerts]: false,
  [InputId.upcomingTldAlerts]: false,
};

function onInputValueChange(inputId: InputId, value: unknown, setData: Dispatch<SetStateAction<SignUpData>>): void {
  setData((currentData: SignUpData) => ({ ...currentData, [inputId]: value }));
}

function onSubmit(data: SignUpData): void {
  alert('Submit ' + JSON.stringify(data));
}

export const SignUpBoxContainer = () => {
  const [data, setData] = useState(initialData);
  return (
    <SignUpBox
      data={data}
      onInputValueChange={(inputId: InputId, value: unknown) => onInputValueChange(inputId, value, setData)}
      onSubmit={() => onSubmit(data)}
    />
  );
};
