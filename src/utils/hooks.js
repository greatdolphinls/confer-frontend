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

  return {
    value,
    onChange: handleInputChange
  };
};

export {
  useInput
}

