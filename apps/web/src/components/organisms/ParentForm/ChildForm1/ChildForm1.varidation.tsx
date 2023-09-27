import { z } from 'zod';

// shouldValidate の 値 が true の場合は、hog と fuga のバリデーションが有効になる
export const childForm1Schema = z.discriminatedUnion('shouldValidate', [
  z.object({
    shouldValidate: z.literal('true'),
    hoge: z.string().min(1, { message: 'Required' }),
    fuga: z.number().min(10),
  }),
  z.object({
    shouldValidate: z.literal('false'),
    hoge: z.unknown().optional(),
    fuga: z.unknown().optional(),
  }),
]);

export type ChildForm1Schema = z.infer<typeof childForm1Schema>;
