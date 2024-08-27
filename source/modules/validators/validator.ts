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
 * @returns The validated email address or null if validation fails.
 */
export function isItValidEmail(
  email: string,
  options: EmailOptions = {}
): string | null {
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

  if (isRequired && !email) return null;

  const normalizedEmail = caseSensitive ? email : email.toLowerCase();

  if (normalizedEmail.length < minLength) return null;
  if (normalizedEmail.length > maxLength) return null;

  const [localPart, domain] = normalizedEmail.split("@");
  if (!localPart || !domain) return null;

  if (!allowSpecialCharacters && /[^a-zA-Z0-9@.]/.test(localPart)) return null;

  const hasTLD = /\.[a-zA-Z]{2,}$/.test(domain);
  if (requiredTLD && !hasTLD) return null;

  const domainParts: string[] = domain.split(".");
  const hasSubdomain: boolean = domainParts.length > 2;
  if (!allowSubdomains && hasSubdomain) return null;

  if (allowedDomains && !allowedDomains.includes(domain)) return null;
  if (disallowedDomains && disallowedDomains.includes(domain)) return null;

  return pattern.test(normalizedEmail) ? normalizedEmail : null;
}

/**
 * Validates an Password based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidPass("1234");

 *
 * @param password - The password to validate.
 * @param options - Optional configuration for the validation process.
 * @returns The validated password or null if validation fails.
 */

export function isItValidPass(
  password: string,
  options: PasswordOptions = {}
): boolean {
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

  if (password.length < minLength) return false;
  if (password.length > maxLength) return false;

  const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
  if (uppercaseCount < requireUppercase) return false;

  const lowercaseCount = (password.match(/[a-z]/g) || []).length;
  if (lowercaseCount < requireLowercase) return false;

  const numberCount = (password.match(/\d/g) || []).length;
  if (numberCount < requireNumbers) return false;

  const specialCharsRegex = new RegExp(
    `[${specialChars.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}]`,
    "g"
  );
  const specialCharCount = (password.match(specialCharsRegex) || []).length;
  if (specialCharCount < requireSpecialChars) return false;

  const uniqueChars = new Set(password).size;
  if (uniqueChars < minUniqueChars) return false;

  return true;
}

/**
 * Validates Date based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidDate("11-20-2024");

 *
 * @param date - The date to validate.
 * @param format - The date format to validate.
 * @returns The validated date or null if validation fails.
 */

export function isItValidDate(date: string, format: string): boolean {
  let regex: RegExp;
  let day: number, month: number, year: number;

  switch (format) {
    case "YYYY-MM-DD":
      regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(date)) return false;
      [year, month, day] = date.split("-").map(Number);
      break;
    case "MM/DD/YYYY":
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(date)) return false;
      [month, day, year] = date.split("/").map(Number);
      break;
    case "DD/MM/YYYY":
      regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!regex.test(date)) return false;
      [day, month, year] = date.split("/").map(Number);
      break;
    default:
      // If no format is provided, consider the date invalid
      return false;
  }

  // Check if month is valid
  if (month < 1 || month > 12) return false;

  // Check if day is valid for the given month and year
  const daysInMonth = new Date(year, month, 0).getDate(); // 0 gets the last day of the previous month
  if (day < 1 || day > daysInMonth) return false;

  // If all checks pass, the date is valid
  return true;
}

/**
 * Validates Numeric input based on various customizable options.
 *
 * @example
 * const isPasswordValid = isItValidNumber(33);

 *
 * @param value  - The number to validate.
 * @param options - Optional configuration for the validation process.
 * @returns The validated date or null if validation fails.
 */

export function isItValidNumber(
  value: number | string,
  options?: NumericOptions
): boolean {
  if (typeof value === "string") {
    value = parseFloat(value);
  }

  if (isNaN(value)) return false;

  const { min, max, decimalPlaces } = options || {};

  // Range validation
  if (min !== undefined && value < min) return false;
  if (max !== undefined && value > max) return false;

  // Decimal place restriction
  if (decimalPlaces !== undefined) {
    const decimalRegex = new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?$`);
    if (!decimalRegex.test(value.toString())) return false;
  }

  return true;
}

/**
 * Validates Url based on various customizable options.
 *
 * @example
 * const isUrlValid = isItValidUrl(33);

 *
 * @param url  - The url to validate.
 * @param options - Optional configuration for the validation process.
 * @returns The validated date or null if validation fails.
 */

export function isItValidUrl(url: string, options?: UrlOptions): boolean {
  const { protocols, format } = options || {};
  const urlRegex = new RegExp(
    `^(https?|ftp|ftps|mailto|file|data|tel|sms|ws|wss):\\/\\/[^\\s/$.?#].[^\\s]*$`
  );

  if (!urlRegex.test(url)) return false;

  if (format && !format.test(url)) return false;

  if (!protocols || protocols.length === 0) return false;

  const protocolPattern = protocols.join("|");
  const protocolRegex = new RegExp(`^(${protocolPattern}):\\/\\/`, "i");
  if (!protocolRegex.test(url)) return false;

  return true;
}
