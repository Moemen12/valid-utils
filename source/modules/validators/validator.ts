import { EMAIL_VALIDATION_PATTERN } from "../../helpers/validatorHelpers";
import {
  EmailOptions,
  NumericOptions,
  PasswordOptions,
  ResponseShape,
  UrlOptions,
} from "./types";

/**
 * Validates an email address based on various customizable options.
 *
 * @example
 * const isValid = isItValidEmail("moemensaadeh@gmail.com");

 *
 * @param email - The email address to validate.
 * @param options - Optional configuration for the validation process.
 * @returns \{ isValid: boolean , result: "message" }
 */

export function isItValidEmail(
  email: string,
  options: EmailOptions = {}
): ResponseShape {
  const {
    pattern = EMAIL_VALIDATION_PATTERN,
    minLength = 0,
    maxLength = Infinity,
    allowSpecialCharacters = true,
    allowedDomains,
    disallowedDomains,
    caseSensitive = false,
    allowSubdomains = true,
    requiredTLD = true,
    isRequired = true,
  } = options;

  if (isRequired && !email) {
    return { isValid: false, result: "Email is required" };
  }

  const normalizedEmail = caseSensitive ? email : email.toLowerCase();

  if (normalizedEmail.length < minLength) {
    return {
      isValid: false,
      result: `Email is too short (minimum ${minLength} characters)`,
    };
  }

  if (normalizedEmail.length > maxLength) {
    return {
      isValid: false,
      result: `Email is too long (maximum ${maxLength} characters)`,
    };
  }

  const [localPart, domain] = normalizedEmail.split("@");

  if (!localPart || !domain) {
    return {
      isValid: false,
      result: "Invalid email format (missing @ or local/domain part)",
    };
  }

  if (!allowSpecialCharacters && /[^a-zA-Z0-9@.]/.test(localPart)) {
    return {
      isValid: false,
      result: "Special characters are not allowed in the local part",
    };
  }

  const hasTLD = /\.[a-zA-Z]{2,}$/.test(domain);

  if (requiredTLD && !hasTLD) {
    return { isValid: false, result: "Top-level domain (TLD) is required" };
  }

  const domainParts: string[] = domain.split(".");
  const hasSubdomain: boolean = domainParts.length > 2;

  if (!allowSubdomains && hasSubdomain) {
    return { isValid: false, result: "Subdomains are not allowed" };
  }

  if (allowedDomains && !allowedDomains.includes(domain)) {
    return {
      isValid: false,
      result: "Domain is not in the list of allowed domains",
    };
  }

  if (disallowedDomains && disallowedDomains.includes(domain)) {
    return {
      isValid: false,
      result: "Domain is in the list of disallowed domains",
    };
  }

  if (!pattern.test(normalizedEmail)) {
    return {
      isValid: false,
      result: "Email does not match the required pattern",
    };
  }

  return { isValid: true, result: normalizedEmail };
}

/**
 * Validates an Password based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidPass("1234");

 *
 * @param password - The password to validate.
 * @param options - Optional configuration for the validation process.
 * @returns \{ isValid: boolean , result: "message" }
 */

export function isItValidPass(
  password: string,
  options: PasswordOptions = {}
): ResponseShape {
  const {
    minLength = 0,
    maxLength = Infinity,
    requireUppercase = 0,
    requireLowercase = 0,
    requireNumbers = 0,
    requireSpecialChars = 0,
    specialChars = "!@#$%^&*()_+{}[]:;<>,.?~\\-",
    minUniqueChars = 0,
  } = options;

  if (password.length < minLength) {
    return {
      isValid: false,
      result: `Password is too short (minimum ${minLength} characters)`,
    };
  }
  if (password.length > maxLength) {
    return {
      isValid: false,
      result: `Password is too long (maximum ${maxLength} characters)`,
    };
  }

  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  if (uppercaseCount < requireUppercase) {
    return {
      isValid: false,
      result: `Not enough uppercase characters (requires ${requireUppercase}, found ${uppercaseCount})`,
    };
  }

  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  if (lowercaseCount < requireLowercase) {
    return {
      isValid: false,
      result: `Not enough lowercase characters (requires ${requireLowercase}, found ${lowercaseCount})`,
    };
  }

  const numberCount = (password.match(/\d/g) || []).length;
  if (numberCount < requireNumbers) {
    return {
      isValid: false,
      result: `Not enough numbers (requires ${requireNumbers}, found ${numberCount})`,
    };
  }

  const specialCharsRegex = new RegExp(
    `[${specialChars.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]`,
    "g"
  );
  const specialCharCount = (password.match(specialCharsRegex) || []).length;
  if (specialCharCount < requireSpecialChars) {
    return {
      isValid: false,
      result: `Not enough special characters (requires ${requireSpecialChars}, found ${specialCharCount})`,
    };
  }

  const uniqueChars = new Set(password).size;
  if (uniqueChars < minUniqueChars) {
    return {
      isValid: false,
      result: `Not enough unique characters (requires ${minUniqueChars}, found ${uniqueChars})`,
    };
  }

  return { isValid: true, result: password };
}

/**
 * Validates Date based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidDate("11-20-2024");

 *
 * @param date - The date to validate.
 * @param format - The date format to validate.
 * @returns \{ isValid: boolean , result: "message" }
 */

export function isItValidDate(date: string, format: string): ResponseShape {
  let regex: RegExp;
  let day: number, month: number, year: number;

  switch (format) {
    case "YYYY-MM-DD":
      regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(date)) {
        return {
          isValid: false,
          result: "Date doesn't match the YYYY-MM-DD format",
        };
      }
      [year, month, day] = date.split("-").map(Number);
      break;
    case "MM/DD/YYYY":
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(date)) {
        return {
          isValid: false,
          result: "Date doesn't match the MM/DD/YYYY format",
        };
      }
      [month, day, year] = date.split("/").map(Number);
      break;
    case "DD/MM/YYYY":
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(date)) {
        return {
          isValid: false,
          result: "Date doesn't match the DD/MM/YYYY format",
        };
      }
      [day, month, year] = date.split("/").map(Number);
      break;
    default:
      return { isValid: false, result: "Unsupported date format" };
  }

  // Check if month is valid
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      result: `Invalid month: ${month}. Month should be between 1 and 12`,
    };
  }

  // Check if day is valid for the given month and year
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return {
      isValid: false,
      result: `Invalid day: ${day}. Day should be between 1 and ${daysInMonth} for month ${month}`,
    };
  }

  // If all checks pass, return the original date string
  return { isValid: true, result: date };
}

/**
 * Validates Numeric input based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidNumber(33);

 *
 * @param value  - The number to validate.
 * @param options - Optional configuration for the validation process.
 * @returns \{ isValid: boolean , result: "message" }
 */

export function isItValidNumber(
  value: number | string,
  options?: NumericOptions
): ResponseShape {
  let numValue: number;

  if (typeof value === "string") {
    numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return { isValid: false, result: `"${value}" is not a valid number` };
    }
  } else {
    numValue = value;
  }

  if (isNaN(numValue)) {
    return { isValid: false, result: "Value is NaN" };
  }

  const { min, max, decimalPlaces } = options || {};

  // Range validation
  if (min !== undefined && numValue < min) {
    return {
      isValid: false,
      result: `Value ${numValue} is less than the minimum ${min}`,
    };
  }
  if (max !== undefined && numValue > max) {
    return {
      isValid: false,
      result: `Value ${numValue} is greater than the maximum ${max}`,
    };
  }

  // Decimal place restriction
  if (decimalPlaces !== undefined) {
    const decimalRegex = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?$`);
    if (!decimalRegex.test(numValue.toString())) {
      return {
        isValid: false,
        result: `Value ${numValue} has more than ${decimalPlaces} decimal places`,
      };
    }
  }

  return { isValid: true, result: numValue };
}

/**
 * Validates Url based on various customizable options.
 *
 * @example
 * const isUrlValid = isItValidUrl(33);

 *
 * @param url  - The url to validate.
 * @param options - Optional configuration for the validation process.
 * @returns \{ isValid: boolean , result: "message" }
 */

export function isItValidUrl(url: string, options?: UrlOptions): ResponseShape {
  const { protocols, format } = options || {};
  const urlRegex = new RegExp(
    `^(https?|ftp|ftps|mailto|file|data|tel|sms|ws|wss):\\/\\/[^\\s/$.?#].[^\\s]*$`
  );

  if (!urlRegex.test(url)) {
    return {
      isValid: false,
      result: "URL does not match the basic URL pattern",
    };
  }

  if (format && !format.test(url)) {
    return {
      isValid: false,
      result: "URL does not match the specified format",
    };
  }

  if (!protocols || protocols.length === 0) {
    return { isValid: false, result: "No protocols specified in options" };
  }

  const protocolPattern = protocols.join("|");
  const protocolRegex = new RegExp(`^(${protocolPattern}):\\/\\/`, "i");
  if (!protocolRegex.test(url)) {
    return {
      isValid: false,
      result: `URL protocol does not match any of the specified protocols: ${protocols.join(
        ", "
      )}`,
    };
  }

  return { isValid: true, result: url };
}
