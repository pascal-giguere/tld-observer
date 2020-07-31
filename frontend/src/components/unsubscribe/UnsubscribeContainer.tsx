import React, { useEffect, useState } from 'react';
import { UnsubscribeView } from '@components/unsubscribe/UnsubscribeView';
import { deleteMember } from '@utils/api';

interface Props {
  memberId?: string;
}

export const UnsubscribeContainer = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!props.memberId) {
      setHasError(true);
      setIsLoading(false);
      console.error('Missing member ID query param');
      return;
    }

    deleteMember(props.memberId)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error: Error) => {
        setHasError(true);
        setIsLoading(false);
        console.error(`Error unsubscribing member: ${error.message}`);
      });
  }, [props.memberId]);

  return <UnsubscribeView isLoading={isLoading} hasError={hasError} />;
};
