# ` Welcome to Valid Utils`

> A simple and flexible validation package for common data types and formats, including email, URLs, dates, numbers, and more.

## Installation

```sh
npm install valid-utils
```

## Usage

```ts
import React, { useState } from "react";

// Assuming `isItValidPass` is imported from your utility file
import { isItValidPass } from "valid-utils";

const PasswordValidator: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [validationResult, setValidationResult] = useState<string | null>(null);

  const validatePassword = () => {
    const options = {
      minLength: 8,
    };

    const { result, isValid } = isItValidPass(password, options);

    if (isValid) {
      setValidationResult("Password is valid");
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

## Available Validation Functions

### `isItValidEmail`

Validates an email address based on various customizable options.

- **Parameters**:
  - `email` (string): The email address to validate.
  - `options` (optional `EmailOptions`): Optional configuration for the validation process.
- **Returns**: `{ isValid: boolean, result: string }`

### `isItValidPass`

Validates a password based on various customizable options.

- **Parameters**:
  - `password` (string): The password to validate.
  - `options` (optional `PasswordOptions`): Optional configuration for the validation process.
- **Returns**: `{ isValid: boolean, result: string }`

### `isItValidDate`

Validates a date based on a specified format.

- **Parameters**:
  - `date` (string): The date to validate.
  - `format` (string): The date format to validate (e.g., "YYYY-MM-DD", "MM/DD/YYYY", "DD/MM/YYYY").
- **Returns**: `{ isValid: boolean, result: string }`

### `isItValidNumber`

Validates a numeric input based on various customizable options.

- **Parameters**:
  - `value` (number | string): The number to validate.
  - `options` (optional `NumericOptions`): Optional configuration for the validation process.
- **Returns**: `{ isValid: boolean, result: string }`

### `isItValidUrl`

Validates a URL based on various customizable options.

- **Parameters**:
  - `url` (string): The URL to validate.
  - `options` (optional `UrlOptions`): Optional configuration for the validation process.
- **Returns**: `{ isValid: boolean, result: string }`

## Type Definitions

### `ResponseShape`

The shape of the response returned by validation functions.

| Property  | Type      | Description                                  |
| --------- | --------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| `isValid` | `boolean` | Indicates whether the input is valid or not. |
| `result`  | `string   | number`                                      | The result of the validation. Contains validation errors or the valid input. |

### `GlobalOptions`

Global options that apply to various validation functions.

| Property    | Type     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| `minLength` | `number` | Minimum length for the input.              |
| `maxLength` | `number` | Maximum length for the input.              |
| `pattern`   | `RegExp` | Regular expression pattern for validation. |

### `EmailOptions`

Options specific to email validation.

| Property                 | Type       | Description                                 |
| ------------------------ | ---------- | ------------------------------------------- |
| `allowSpecialCharacters` | `boolean`  | Allow special characters in the local part. |
| `allowedDomains`         | `string[]` | List of allowed domains.                    |
| `disallowedDomains`      | `string[]` | List of disallowed domains.                 |
| `caseSensitive`          | `boolean`  | Case sensitivity for email validation.      |
| `allowSubdomains`        | `boolean`  | Allow subdomains in the domain part.        |
| `requiredTLD`            | `boolean`  | Require a top-level domain.                 |
| `isRequired`             | `boolean`  | Whether the email is required.              |

### `PasswordOptions`

Options specific to password validation.

| Property              | Type     | Description                                      |
| --------------------- | -------- | ------------------------------------------------ |
| `requireUppercase`    | `number` | Minimum number of uppercase characters required. |
| `requireLowercase`    | `number` | Minimum number of lowercase characters required. |
| `requireNumbers`      | `number` | Minimum number of numeric characters required.   |
| `requireSpecialChars` | `number` | Minimum number of special characters required.   |
| `specialChars`        | `string` | Allowed special characters.                      |
| `minUniqueChars`      | `number` | Minimum number of unique characters required.    |

### `NumericOptions`

Options specific to numeric validation.

| Property        | Type     | Description                       |
| --------------- | -------- | --------------------------------- |
| `min`           | `number` | Minimum value allowed.            |
| `max`           | `number` | Maximum value allowed.            |
| `decimalPlaces` | `number` | Number of decimal places allowed. |

### `UrlOptions`

Options specific to URL validation.

| Property    | Type                 | Description                               |
| ----------- | -------------------- | ----------------------------------------- |
| `protocols` | `AllowedProtocols[]` | Allowed URL protocols.                    |
| `format`    | `RegExp`             | Regular expression format for validation. |

### `AllowedProtocols`

This type defines the allowed protocols for URLs.

| Protocol | Description                        |
| -------- | ---------------------------------- |
| `http`   | Hypertext Transfer Protocol        |
| `https`  | Hypertext Transfer Protocol Secure |
| `ftp`    | File Transfer Protocol             |
| `ftps`   | File Transfer Protocol Secure      |
| `mailto` | Email address                      |
| `file`   | Local file                         |
| `data`   | Data URL scheme                    |
| `tel`    | Telephone number                   |
| `sms`    | Short Message Service              |
| `ws`     | WebSocket protocol                 |
| `wss`    | WebSocket Secure protocol          |

## Contributing

There are many different ways to contribute to React Router's development. If you're interested, check out [our contributing guidelines](CONTRIBUTING.md) to learn how you can get involved.
