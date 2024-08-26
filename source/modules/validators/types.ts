type GlobalOptions = {
  minLength?: number;
  maxLength?: number;
};

type EmailOptions = {
  pattern?: RegExp;
  allowSpecialCharacters?: boolean;
  allowedDomains?: string[];
  disallowedDomains?: string[];
  caseSensitive?: boolean;
  allowSubdomains?: boolean;
  requiredTLD?: boolean;
  isRequired?: boolean;
};

// Combine both types into a new type
type Options = GlobalOptions & EmailOptions;
