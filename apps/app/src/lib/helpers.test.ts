import { describe, expect, it } from "vitest";
import { compact, usd } from "./api";
import { hostOf, safeHref } from "./url";

describe("money", () => {
  it("formats money without rounding small costs away", () => {
    expect(usd(0.024)).toBe("$0.024");
    expect(usd(1.5)).toBe("$1.50");
    expect(usd(12.659)).toBe("$12.66");
    expect(usd(null)).toBe("—");
    expect(compact(1500)).toBe("1.5K");
  });
});

describe("urls", () => {
  it("reads hosts and only links http(s)", () => {
    expect(hostOf("https://www.acme.com/path")).toBe("acme.com");
    expect(hostOf("acme.com")).toBe("acme.com");
    expect(safeHref("javascript:alert(1)")).toBeUndefined();
    expect(safeHref("https://acme.com")).toBe("https://acme.com");
  });
});
