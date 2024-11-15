export type FiveOrLessArray<T> = T[] & { length: 0 | 1 | 2 | 3 | 4 | 5 }
