import React, { Dispatch, SetStateAction, useState } from 'react';
import * as yup from 'yup';
import { SignUpBox } from '@components/signUp/SignUpBox';
import { createMember } from '@utils/api';
import { ApiError, CreateMemberParams, IMember } from '@common/interfaces';
import { AxiosError } from 'axios';
import { ErrorCode, TopicKey } from '@common/enums';

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

const validationSchema: yup.ObjectSchema = yup
  .object()
  .shape({
    [InputId.name]: yup.string().max(99, 'Your name is too long').required('Please enter your name'),
    [InputId.email]: yup
      .string()
      .max(99, 'Your email is too long')
      .email('Please enter a valid email address')
      .required('Please enter your email address'),
    [InputId.newTldAlerts]: yup.boolean(),
    [InputId.upcomingTldAlerts]: yup.boolean(),
  })
  .test('minOneTopic', 'Please select at least one type of alert', (obj) => {
    return obj[InputId.newTldAlerts] || obj[InputId.upcomingTldAlerts];
  });

function onInputValueChange(inputId: InputId, value: unknown, setData: Dispatch<SetStateAction<SignUpData>>): void {
  setData((currentData: SignUpData) => ({ ...currentData, [inputId]: value }));
}

async function onSubmit(
  data: SignUpData,
  setInfoMessage: Dispatch<SetStateAction<string | null>>,
  setErrorMessage: Dispatch<SetStateAction<string | null>>,
  setDidSubmit: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  const validationError: yup.ValidationError | undefined = validateData(data);
  if (validationError) {
    setErrorMessage(validationError.message);
    return;
  }
  setInfoMessage(`Check your mailbox! We've just sent a confirmation email to ${data[InputId.email]}.`);
  setErrorMessage(null);
  setDidSubmit(true);

  await submitData(data, setErrorMessage);
}

function validateData(data: SignUpData): yup.ValidationError | undefined {
  try {
    validationSchema.validateSync(data);
  } catch (error) {
    return error;
  }
}

async function submitData(data: SignUpData, setErrorMessage: Dispatch<SetStateAction<string | null>>): Promise<void> {
  const topicKeys: TopicKey[] = [];
  if (data[InputId.newTldAlerts]) topicKeys.push(TopicKey.newTlds);
  if (data[InputId.upcomingTldAlerts]) topicKeys.push(TopicKey.upcomingTlds);
  const createParams: CreateMemberParams = { name: data[InputId.name], email: data[InputId.email], topicKeys };

  try {
    const member: IMember = await createMember(createParams);
    console.debug('Created member: ', member);
  } catch (error) {
    const apiError: ApiError | undefined = (error as AxiosError<ApiError>).response?.data;
    if (typeof apiError?.errorCode === 'undefined') throw error;
    console.error('Error creating member: ', apiError.errorCode, apiError.message);
    setErrorMessage(messageForErrorCode(apiError.errorCode));
  }
}

function messageForErrorCode(errorCode: ErrorCode): string {
  switch (errorCode) {
    case ErrorCode.memberAlreadyExists:
      return "You've already signed up! Check your emails for the next steps.";
    case ErrorCode.invalidData:
      return 'Please make sure you entered your information correctly and try again';
    case ErrorCode.unknownError:
      return 'Oops! Something went wrong. Please try again later.';
  }
}

export const SignUpBoxContainer = () => {
  const [data, setData] = useState(initialData);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [didSubmit, setDidSubmit] = useState(false);

  return (
    <SignUpBox
      data={data}
      infoMessage={infoMessage}
      errorMessage={errorMessage}
      didSubmit={didSubmit}
      onInputValueChange={(inputId: InputId, value: unknown) => onInputValueChange(inputId, value, setData)}
      onSubmit={() => onSubmit(data, setInfoMessage, setErrorMessage, setDidSubmit)}
    />
  );
};
