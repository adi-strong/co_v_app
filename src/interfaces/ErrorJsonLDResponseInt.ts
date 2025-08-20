import type {ViolationInt} from "./ViolationInt.ts";

export interface ErrorJsonLDResponseInt {
  data: {
    detail: string
    violations: ViolationInt[] | undefined
  }
}
