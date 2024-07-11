import { z } from "zod";
import { albumSchema } from "../schemas/album";

export type Album = z.infer<typeof albumSchema>;