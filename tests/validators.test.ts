import {
  isItValidDate,
  isItValidEmail,
  isItValidNumber,
  isItValidPass,
  isItValidUrl,
} from "../source/modules/validators/validator";

// All Validators Testing

describe("All Validators", () => {
  /*

  ** Email Validation Testing

 */
  it("should check if email is valid and if email option param works", () => {
    expect(
      isItValidEmail("example@gmail.com", {
        maxLength: 30,
      })
    ).toBeTruthy();
  });

  /*

  ** Password Validation Testing

 */

  it("should check if password option param works", () => {
    expect(
      isItValidPass("mmmOOO778###", {
        requireLowercase: 3,
        requireUppercase: 3,
        requireNumbers: 3,
        requireSpecialChars: 3,
        specialChars: "#",
      })
    ).toBeTruthy();
  });

  /*

  ** Date Validation Testing

 */

  it("should check if Date format is valid", () => {
    // @Param data
    // allowed format : YYYY-MM-DD      MM/DD/YYYY    DD/MM/YYYY

    expect(isItValidDate("01/12/2024", "MM/DD/YYYY")).toBeTruthy();
  });

  /*

  ** Number validation Testing

 */

  it("should check if Date format is valid", () => {
    // @Param data
    // allowed format : YYYY-MM-DD      MM/DD/YYYY    DD/MM/YYYY

    expect(
      isItValidNumber(3.2449, {
        min: 1,
        max: 5,
        decimalPlaces: 4,
      })
    ).toBeTruthy();
  });

  /*

  ** url validation Testing

 */

  it.only("should check if url format is valid", () => {
    /**  @Param url
     formats : 
     --------
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

     */
    expect(
      isItValidUrl("http://moemen.com", {
        protocols: ["http", "mailto"],
        format: /moemen/i,
      })
    ).toBeTruthy();
  });
});
