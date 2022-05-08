import { useState } from 'react';

const useTrueFalse= (initialState = false) => {

  const [state, setState] = useState(initialState);

  const handleSetTrue = () => {
    setState(true);
  }

  const handleSetFalse = () => {
    setState(false);
  }

  return [state, handleSetTrue, handleSetFalse];
}

export default useTrueFalse;