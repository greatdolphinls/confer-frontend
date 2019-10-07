import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = event => {
    if (typeof event === 'string') {
      setValue(event);
    } else {
      setValue(event.target.value);
    }
  };

  return {
    value,
    onChange: handleInputChange
  };
};

export {
  useInput
}

