import { isItValidEmail } from "../source/modules/validators/validator";

describe("All Validators", () => {
  it("should check if email is valid and if email option param works", () => {
    expect(
      isItValidEmail("moemensaadeh3@gmail.com", {
        caseSensitive: false,
      })
    ).toBeTruthy();
  });
});
