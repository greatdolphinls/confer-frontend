import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = event => {
    if (!event.target) {
      setValue(event);
    } else {
      setValue(event.target.value);
    }
  };

  const handleSetValue = value => {
    setValue(value);
  };

  return {
    value,
    onSet: handleSetValue,
    onChange: handleInputChange
  };
};

export {
  useInput
}

