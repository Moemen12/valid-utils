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
    ).toBe("example@gmail.com");

    expect(
      isItValidEmail("example@gmail.com", {
        maxLength: 10,
      })
    ).toMatchObject({ isValid: false });
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
    ).toBe("mmmOOO778###");

    expect(
      isItValidPass("mmmOOO778###", {
        requireLowercase: 3,
        requireUppercase: 3,
        requireNumbers: 3,
        requireSpecialChars: 5,
        specialChars: "#",
      })
    ).toMatchObject({ isValid: false });
  });

  /*

  ** Date Validation Testing

 */

  it("should check if Date format is valid", () => {
    // @Param data
    // allowed format : YYYY-MM-DD      MM/DD/YYYY    DD/MM/YYYY

    expect(isItValidDate("01/12/2024", "MM/DD/YYYY")).toBe("01/12/2024");
    expect(isItValidDate("01-12-2024", "MM/DD/YYYY")).toMatchObject({
      isValid: false,
    });
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
    ).toBe(3.2449);

    expect(
      isItValidNumber(3.2449, {
        min: 4,
        max: 5,
        decimalPlaces: 3,
      })
    ).toMatchObject({
      isValid: false,
    });
  });

  /*

  ** url validation Testing

 */

  it("should check if url format is valid", () => {
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
    ).toBe("http://moemen.com");

    expect(
      isItValidUrl("https://moemen.com", {
        protocols: ["http", "mailto"],
        format: /moemen/i,
      })
    ).toMatchObject({
      isValid: false,
    });
  });
});
