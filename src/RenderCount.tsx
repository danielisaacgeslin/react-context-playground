import React from 'react';

const counter = (() => {
  let count = 0;
  return () => ++count;
})();

export const RenderCount = () => {
  return (
    <span>
      {counter()}
    </span>
  );
};
