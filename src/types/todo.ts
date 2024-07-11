import { z } from 'zod';
import { todoSchema } from '../schemas/todo';

export type Todo = z.infer<typeof todoSchema>;