import React from 'react';

interface Props {
  isLoading: boolean;
  hasError: boolean;
}

export const UnsubscribeView = (props: Props) => {
  if (props.isLoading) return null;

  if (props.hasError) {
    return (
      <React.Fragment>
        <h1>Oops. We couldn't unsubscribe you.</h1>
        <div>You might already be unsubscribed or might have followed a broken link.</div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h1>You've been unsubscribed.</h1>
      <div>You will no longer receive TLD alerts by email.</div>
    </React.Fragment>
  );
};
