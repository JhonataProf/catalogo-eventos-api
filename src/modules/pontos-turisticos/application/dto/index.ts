import z from "zod";
import { createPontoTuristicoSchema } from "../../presentation/http/validators/ponto-turistico-schemas";

export type createPontoTuristicoDTO = z.infer<typeof createPontoTuristicoSchema>;
export type updatePontoTuristicoDTO = Partial<createPontoTuristicoDTO>;