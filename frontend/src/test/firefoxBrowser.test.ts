import { describe, expect, it } from "vitest";
import {
  firefoxExecutablePath,
  supportsPinnedFirefox,
} from "../../testing/firefoxBrowser";
describe("pinned Firefox test runtime", () => {
  it("limits automatic installation to the verified upstream platform", () => {
    expect(
      supportsPinnedFirefox("linux", "x64", 'ID=debian\nVERSION_ID="13"'),
    ).toBe(true);
    for (const [platform, arch, release] of [
      ["linux", "arm64", "ID=debian\nVERSION_ID=13"],
      ["linux", "x64", "ID=ubuntu\nVERSION_ID=24.04"],
      ["linux", "x64", "ID=debian\nVERSION_ID=12"],
      ["win32", "x64", ""],
    ])
      expect(supportsPinnedFirefox(platform!, arch!, release!)).toBe(false);
  });
  it("selects the fixed executable by default and honors an explicit alternative", () => {
    expect(firefoxExecutablePath("")).toMatch(
      /firefox-1575-debian13-x64[/\\]firefox[/\\]firefox$/,
    );
    expect(firefoxExecutablePath("/verified/firefox")).toBe(
      "/verified/firefox",
    );
  });
});
