import { Links } from "@/core/http";

const API_PREFIX = "/api";

export const pontoTuristicoLinks = (id?: number): Links => ({
  self: {
    href: `${API_PREFIX}/pontos-turisticos/${id}`,
    method: "GET",
  },
  update: {
    href: `${API_PREFIX}/pontos-turisticos/${id}`,
    method: "PUT",
  },
  delete: {
    href: `${API_PREFIX}/pontos-turisticos/${id}`,
    method: "DELETE",
  },
  list: {
    href: `${API_PREFIX}/pontos-turisticos`,
    method: "GET",
  },
});

export const pontosTuristicosCollectionLinks = (): Links => ({
  self: {
    href: `${API_PREFIX}/pontos-turisticos`,
    method: "GET",
  },
  create: {
    href: `${API_PREFIX}/pontos-turisticos`,
    method: "POST",
  },
});