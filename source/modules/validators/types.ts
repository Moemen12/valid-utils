export type AllowedProtocols =
  | "http"
  | "https"
  | "ftp"
  | "ftps"
  | "mailto"
  | "file"
  | "data"
  | "tel"
  | "sms"
  | "ws"
  | "wss";

export interface ResponseShape {
  isValid: boolean;
  result: string | number;
}

export interface GlobalOptions {
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

export interface EmailOptions extends GlobalOptions {
  allowSpecialCharacters?: boolean;
  allowedDomains?: string[];
  disallowedDomains?: string[];
  caseSensitive?: boolean;
  allowSubdomains?: boolean;
  requiredTLD?: boolean;
  isRequired?: boolean;
}

export interface PasswordOptions extends GlobalOptions {
  requireUppercase?: number;
  requireLowercase?: number;
  requireNumbers?: number;
  requireSpecialChars?: number;
  specialChars?: string;
  minUniqueChars?: number;
}

export interface NumericOptions {
  min?: number;
  max?: number;
  decimalPlaces?: number;
}

export interface UrlOptions {
  protocols?: AllowedProtocols[];
  format?: RegExp;
}
