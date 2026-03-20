// src/modules/events/presentation/http/event-hateoas.ts
import { Links } from "@/core/http/http-resource";

type SortDir = "asc" | "desc";
const API_ADMIN_PREFIX = "/api/admin";
export function eventLinks(id: string | number): Links {
  const eventId = String(id);

  return {
    self: { href: `${API_ADMIN_PREFIX}/events/${eventId}`, method: "GET" },
    update: { href: `${API_ADMIN_PREFIX}/events/${eventId}`, method: "PUT" },
    delete: { href: `${API_ADMIN_PREFIX}/events/${eventId}`, method: "DELETE" },
    list: { href: `${API_ADMIN_PREFIX}/events`, method: "GET" },
  };
}

type ListLinksParams = {
  page: number;
  limit: number;
  totalPages: number;
  // preserve filtros e sort no link
  filters?: Record<string, any>;
  sort?: { by?: string; dir?: SortDir };
};

function toQueryString(params: Record<string, any>) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    qs.set(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
}

export function eventListLinks({
  page,
  limit,
  totalPages,
  filters,
  sort,
}: ListLinksParams): Links {

  const baseQuery = {
    page,
    limit,
    ...(filters ?? {}),
    sortBy: sort?.by,
    sortDir: sort?.dir,
  };

  const self = `${API_ADMIN_PREFIX}${toQueryString(baseQuery)}`;

  const next =
    page < totalPages
      ? `${API_ADMIN_PREFIX}${toQueryString({ ...baseQuery, page: page + 1 })}`
      : undefined;

  const prev =
    page > 1 ? `${API_ADMIN_PREFIX}${toQueryString({ ...baseQuery, page: page - 1 })}` : undefined;

  const first = `${API_ADMIN_PREFIX}${toQueryString({ ...baseQuery, page: 1 })}`;
  const last = `${API_ADMIN_PREFIX}${toQueryString({ ...baseQuery, page: totalPages })}`;

  return {
    self: { href: self, method: "GET" },
    first: { href: first, method: "GET" },
    last: { href: last, method: "GET" },
    ...(next ? { next: { href: next, method: "GET" } } : {}),
    ...(prev ? { prev: { href: prev, method: "GET" } } : {}),
  };
}