import { getIdForNavigation } from "./navigation"; 

describe("getIdForNavigation", () => {
  it("видаляє '#' з початку ID", () => {
    const result = getIdForNavigation("#exampleId");
    expect(result).toBe("exampleId");
  });

  it("повертає ID без змін, якщо він не починається з '#'", () => {
    const result = getIdForNavigation("exampleId");
    expect(result).toBe("exampleId");
  });

  it("повертає порожній рядок, якщо ID дорівнює '#'", () => {
    const result = getIdForNavigation("#");
    expect(result).toBe("");
  });
});
