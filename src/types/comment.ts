import { z } from 'zod';
import { commentSchema } from '../schemas/comment';

export type Comment = z.infer<typeof commentSchema>;