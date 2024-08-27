import { EMAIL_VALIDATION_PATTERN } from "../../helpers/validatorHelpers";
import {
  EmailOptions,
  NumericOptions,
  PasswordOptions,
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
 * @returns The validated email address or { isValid: false , reason: "message" }; if validation fails.
 */

export function isItValidEmail(
  email: string,
  options: EmailOptions = {}
): string | { isValid: false; reason: string } {
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
    return { isValid: false, reason: "Email is required" };
  }

  const normalizedEmail = caseSensitive ? email : email.toLowerCase();

  if (normalizedEmail.length < minLength) {
    return {
      isValid: false,
      reason: `Email is too short (minimum ${minLength} characters)`,
    };
  }

  if (normalizedEmail.length > maxLength) {
    return {
      isValid: false,
      reason: `Email is too long (maximum ${maxLength} characters)`,
    };
  }

  const [localPart, domain] = normalizedEmail.split("@");

  if (!localPart || !domain) {
    return {
      isValid: false,
      reason: "Invalid email format (missing @ or local/domain part)",
    };
  }

  if (!allowSpecialCharacters && /[^a-zA-Z0-9@.]/.test(localPart)) {
    return {
      isValid: false,
      reason: "Special characters are not allowed in the local part",
    };
  }

  const hasTLD = /\.[a-zA-Z]{2,}$/.test(domain);

  if (requiredTLD && !hasTLD) {
    return { isValid: false, reason: "Top-level domain (TLD) is required" };
  }

  const domainParts: string[] = domain.split(".");
  const hasSubdomain: boolean = domainParts.length > 2;

  if (!allowSubdomains && hasSubdomain) {
    return { isValid: false, reason: "Subdomains are not allowed" };
  }

  if (allowedDomains && !allowedDomains.includes(domain)) {
    return {
      isValid: false,
      reason: "Domain is not in the list of allowed domains",
    };
  }

  if (disallowedDomains && disallowedDomains.includes(domain)) {
    return {
      isValid: false,
      reason: "Domain is in the list of disallowed domains",
    };
  }

  if (!pattern.test(normalizedEmail)) {
    return {
      isValid: false,
      reason: "Email does not match the required pattern",
    };
  }

  return normalizedEmail;
}
/**
 * Validates an Password based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidPass("1234");

 *
 * @param password - The password to validate.
 * @param options - Optional configuration for the validation process.
 * @returns The validated password or { isValid: false , reason: "message" }; if validation fails.
 */

export function isItValidPass(
  password: string,
  options: PasswordOptions = {}
): string | { isValid: false; reason: string } {
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
      reason: `Password is too short (minimum ${minLength} characters)`,
    };
  }
  if (password.length > maxLength) {
    return {
      isValid: false,
      reason: `Password is too long (maximum ${maxLength} characters)`,
    };
  }

  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  if (uppercaseCount < requireUppercase) {
    return {
      isValid: false,
      reason: `Not enough uppercase characters (requires ${requireUppercase}, found ${uppercaseCount})`,
    };
  }

  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  if (lowercaseCount < requireLowercase) {
    return {
      isValid: false,
      reason: `Not enough lowercase characters (requires ${requireLowercase}, found ${lowercaseCount})`,
    };
  }

  const numberCount = (password.match(/\d/g) || []).length;
  if (numberCount < requireNumbers) {
    return {
      isValid: false,
      reason: `Not enough numbers (requires ${requireNumbers}, found ${numberCount})`,
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
      reason: `Not enough special characters (requires ${requireSpecialChars}, found ${specialCharCount})`,
    };
  }

  const uniqueChars = new Set(password).size;
  if (uniqueChars < minUniqueChars) {
    return {
      isValid: false,
      reason: `Not enough unique characters (requires ${minUniqueChars}, found ${uniqueChars})`,
    };
  }

  return password;
}

/**
 * Validates Date based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidDate("11-20-2024");

 *
 * @param date - The date to validate.
 * @param format - The date format to validate.
 * @returns The validated date or { isValid: false , reason: "message" }; if validation fails.
 */

export function isItValidDate(
  date: string,
  format: string
): string | { isValid: false; reason: string } {
  let regex: RegExp;
  let day: number, month: number, year: number;

  switch (format) {
    case "YYYY-MM-DD":
      regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(date)) {
        return {
          isValid: false,
          reason: "Date doesn't match the YYYY-MM-DD format",
        };
      }
      [year, month, day] = date.split("-").map(Number);
      break;
    case "MM/DD/YYYY":
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(date)) {
        return {
          isValid: false,
          reason: "Date doesn't match the MM/DD/YYYY format",
        };
      }
      [month, day, year] = date.split("/").map(Number);
      break;
    case "DD/MM/YYYY":
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(date)) {
        return {
          isValid: false,
          reason: "Date doesn't match the DD/MM/YYYY format",
        };
      }
      [day, month, year] = date.split("/").map(Number);
      break;
    default:
      return { isValid: false, reason: "Unsupported date format" };
  }

  // Check if month is valid
  if (month < 1 || month > 12) {
    return {
      isValid: false,
      reason: `Invalid month: ${month}. Month should be between 1 and 12`,
    };
  }

  // Check if day is valid for the given month and year
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return {
      isValid: false,
      reason: `Invalid day: ${day}. Day should be between 1 and ${daysInMonth} for month ${month}`,
    };
  }

  // If all checks pass, return the original date string
  return date;
}

/**
 * Validates Numeric input based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidNumber(33);

 *
 * @param value  - The number to validate.
 * @param options - Optional configuration for the validation process.
 * @returns The validated number or { isValid: false , reason: "message" }; if validation fails.
 */

export function isItValidNumber(
  value: number | string,
  options?: NumericOptions
): number | { isValid: false; reason: string } {
  let numValue: number;

  if (typeof value === "string") {
    numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return { isValid: false, reason: `"${value}" is not a valid number` };
    }
  } else {
    numValue = value;
  }

  if (isNaN(numValue)) {
    return { isValid: false, reason: "Value is NaN" };
  }

  const { min, max, decimalPlaces } = options || {};

  // Range validation
  if (min !== undefined && numValue < min) {
    return {
      isValid: false,
      reason: `Value ${numValue} is less than the minimum ${min}`,
    };
  }
  if (max !== undefined && numValue > max) {
    return {
      isValid: false,
      reason: `Value ${numValue} is greater than the maximum ${max}`,
    };
  }

  // Decimal place restriction
  if (decimalPlaces !== undefined) {
    const decimalRegex = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?$`);
    if (!decimalRegex.test(numValue.toString())) {
      return {
        isValid: false,
        reason: `Value ${numValue} has more than ${decimalPlaces} decimal places`,
      };
    }
  }

  return numValue;
}

/**
 * Validates Url based on various customizable options.
 *
 * @example
 * const isUrlValid = isItValidUrl(33);

 *
 * @param url  - The url to validate.
 * @param options - Optional configuration for the validation process.
 * @returns The validated url or { isValid: false , reason: "message" }; if validation fails.
 */

export function isItValidUrl(
  url: string,
  options?: UrlOptions
): string | { isValid: false; reason: string } {
  const { protocols, format } = options || {};
  const urlRegex = new RegExp(
    `^(https?|ftp|ftps|mailto|file|data|tel|sms|ws|wss):\\/\\/[^\\s/$.?#].[^\\s]*$`
  );

  if (!urlRegex.test(url)) {
    return {
      isValid: false,
      reason: "URL does not match the basic URL pattern",
    };
  }

  if (format && !format.test(url)) {
    return {
      isValid: false,
      reason: "URL does not match the specified format",
    };
  }

  if (!protocols || protocols.length === 0) {
    return { isValid: false, reason: "No protocols specified in options" };
  }

  const protocolPattern = protocols.join("|");
  const protocolRegex = new RegExp(`^(${protocolPattern}):\\/\\/`, "i");
  if (!protocolRegex.test(url)) {
    return {
      isValid: false,
      reason: `URL protocol does not match any of the specified protocols: ${protocols.join(
        ", "
      )}`,
    };
  }

  return url;
}
