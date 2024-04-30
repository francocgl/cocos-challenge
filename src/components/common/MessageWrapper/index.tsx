import React, { type ReactElement } from 'react';

const MessageWrapper = ({ text }: { text: string }): ReactElement => {
  return (
    <div className="cocos__message-wrapper">
      <h2 className="cocos__message-wrapper__text">{text}</h2>
    </div>
  );
};

export default MessageWrapper;
