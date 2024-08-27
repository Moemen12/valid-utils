# ` Welcome to Valid Utils`

> A simple and flexible validation package for common data types and formats, including email, URLs, dates, numbers, and more.

## Installation

```sh
npm install valid-utils
```

## Usage


```ts

import React, { useState } from 'react';

// Assuming `isItValidPass` is imported from your utility file
import { isItValidPass } from 'valid-utils';

const PasswordValidator: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const validatePassword = () => {

    const options = {
      minLength: 8
    };

    const { result,isValid } = isItValidPass(password, options);

    if (isValid) {
      setValidationResult('Password is valid');
    } else {
      setValidationResult(`Password is invalid: ${result}`);
    }
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button onClick={validatePassword}>Validate Password</button>
      {validationResult && <p>{validationResult}</p>}
    </div>
  );
};

export default PasswordValidator;


```

## Contributing

There are many different ways to contribute to React Router's development. If you're interested, check out [our contributing guidelines](CONTRIBUTING.md) to learn how you can get involved.
