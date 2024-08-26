import { EMAIL_VALIDATION_PATTERN } from "../../helpers/validatorHelpers";

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
  options?: Options
): string | null {
  const {
    pattern = EMAIL_VALIDATION_PATTERN,
    minLength,
    maxLength,
    allowSpecialCharacters = true,
    allowedDomains,
    disallowedDomains,
    caseSensitive = false,
    allowSubdomains = true,
    requiredTLD = true,
    isRequired = true,
  } = options || {};

  if (isRequired && !email) return null;

  const normalizedEmail = caseSensitive ? email : email.toLowerCase();

  if (minLength && normalizedEmail.length < minLength) return null;
  if (maxLength && normalizedEmail.length > maxLength) return null;

  const [localPart, domain] = normalizedEmail.split("@");
  if (!localPart || !domain) return null;

  if (!allowSpecialCharacters && /[^a-zA-Z0-9@.]/.test(localPart)) return null;

  const hasTLD = /\.[a-zA-Z]{2,}$/.test(domain);
  if (requiredTLD && !hasTLD) return null;

  const domainParts = domain.split(".");
  const hasSubdomain = domainParts.length > 2;
  if (!allowSubdomains && hasSubdomain) return null;

  if (allowedDomains && !allowedDomains.includes(domain)) return null;
  if (disallowedDomains && disallowedDomains.includes(domain)) return null;

  return pattern.test(normalizedEmail) ? normalizedEmail : null;
}
