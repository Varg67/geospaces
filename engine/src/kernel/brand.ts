declare const brand: unique symbol;

/** Nominal type: a value of `T` that the compiler keeps distinct per `Name`. */
export type Brand<T, Name extends string> = T & { readonly [brand]: Name };
