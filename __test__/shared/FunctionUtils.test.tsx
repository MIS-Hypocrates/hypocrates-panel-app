import { describe, expect, it } from "@jest/globals";
import { FunctionUtils } from "@/shared/utils/FunctionUtils";
import { fn } from "jest-mock";

describe("FunctionUtils", () => {
  const functionUtils = new FunctionUtils();

  it("Запуск callback, если true", () => {
    const callback = fn();

    functionUtils.runIfNoFalse(true, callback);

    expect(callback).toHaveBeenCalledWith(true);
  });

  it("Не запускать callback", () => {
    const callback = fn();

    functionUtils.runIfNoFalse(false, callback);

    expect(callback).not.toHaveBeenCalled();
  });
});
