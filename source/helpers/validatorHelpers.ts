// Helper functions and variable that are used inside the core (modules folder)

import { AllowedProtocols } from "../modules/validators/types";

export const EMAIL_VALIDATION_PATTERN: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const PROTOCOLS: AllowedProtocols[] = [
  "http",
  "https",
  "ftp",
  "ftps",
  "mailto",
  "file",
  "data",
  "tel",
  "sms",
  "ws",
  "wss",
];
