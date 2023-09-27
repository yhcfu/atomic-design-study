import { z } from 'zod';

import { childForm1Schema } from './ChildForm1/ChildForm1.varidation';
import { childForm2Schema } from './ChildForm2/ChildForm2.varidation';

export const parentFormSchema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
  childForm1: childForm1Schema,
  childForm2: childForm2Schema,
});

export type ParentFormSchema = z.infer<typeof parentFormSchema>;
