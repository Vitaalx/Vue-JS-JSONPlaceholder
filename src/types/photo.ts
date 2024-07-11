import { z } from 'zod';
import { photoSchema } from '../schemas/photo';

export type Photo = z.infer<typeof photoSchema>;