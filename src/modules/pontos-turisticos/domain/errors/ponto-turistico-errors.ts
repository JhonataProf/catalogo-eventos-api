import { AppError } from "@/core/errors-app-error";

export const PontoTuristicoNotFound = (id: number) =>
  new AppError({
    code: "PONTO_TURISTICO_NOT_FOUND",
    message: `Ponto Tursitico com id ${id} não foi encontrado.`,
    statusCode: 404,
    details: { id },
  });