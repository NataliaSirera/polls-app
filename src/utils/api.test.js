import { authenticate } from "./api.js";

describe("authenticate", () => {
  it("returns true if user and password are passed", async () => {
    const response = await authenticate("sarahedo", "password123");
    expect(response).toBeTruthy();
  });

  it("returns error if an incorrect user or password is passed", async () => {
    await authenticate("wrongUser", "password123").catch((e) =>
      expect(e).toEqual("The username or password is incorrect")
    );
    await authenticate("sarahedo", "wrongPassword").catch((e) =>
      expect(e).toEqual("The username or password is incorrect")
    );
  });
});
