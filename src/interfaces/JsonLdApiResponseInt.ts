import type {ErrorJsonLDResponseInt} from "./ErrorJsonLDResponseInt.ts";

export interface JsonLdApiResponseInt<T> {
  data?: T;
  error?: ErrorJsonLDResponseInt
}
