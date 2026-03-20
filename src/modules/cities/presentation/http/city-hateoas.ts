import { Links } from "@/core/http/http-resource";

const API_ADMIN_PREFIX = "/api/admin";

export const adminCityLinks = (id?: number): Links => ({
  self: {
    href: `${API_ADMIN_PREFIX}/cities/${id}`,
    method: "GET",
  },
  update: {
    href: `${API_ADMIN_PREFIX}/cities/${id}`,
    method: "PUT",
  },
  delete: {
    href: `${API_ADMIN_PREFIX}/cities/${id}`,
    method: "DELETE",
  },
  list: {
    href: `${API_ADMIN_PREFIX}/cities`,
    method: "GET",
  },
});

export const adminCitiesCollectionLinks = (): Links => ({
  self: {
    href: `${API_ADMIN_PREFIX}/cities`,
    method: "GET",
  },
  create: {
    href: `${API_ADMIN_PREFIX}/cities`,
    method: "POST",
  },
});