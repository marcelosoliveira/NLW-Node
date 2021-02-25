

describe('First', () => {
  it("Init first test success", () => {
    expect("First".concat("est")).toBe("Firstest");
  });

  it("Init first test failure", () => {
    expect("First".concat("est")).not.toBe("First");
  });
});