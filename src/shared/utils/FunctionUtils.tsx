import "reflect-metadata";
import { provide } from "inversify-binding-decorators";

@provide(FunctionUtils)
export class FunctionUtils {
  runIfNoFalse<T>(
    value: T | undefined | null | false,
    callback: (value: T) => void,
  ): void {
    if (!!value) callback(value);
  }
}
