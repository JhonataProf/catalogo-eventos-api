// src/modules/pontos-turisticos/application/sorting/ponto-turistico.sort.ts
export const PONTO_TURISTICO_SORT_FIELDS = [
  "nome",
  "cidade",
  "estado",
  "createdAt",
] as const;

export type PontoTuristicoSortField = (typeof PONTO_TURISTICO_SORT_FIELDS)[number];