import { HomeBannerEntity } from "@/modules/home-banners/domain/entities/home-banner.entity";

/** Corpo JSON alinhado ao contrato admin de home banners. */
export interface HomeBannerHttpPayload {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  active: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export function toHomeBannerHttpPayload(
  source: HomeBannerEntity | HomeBannerHttpPayload,
): HomeBannerHttpPayload {
  if (source instanceof HomeBannerEntity) {
    return {
      id: source.id,
      title: source.title,
      subtitle: source.subtitle,
      imageUrl: source.imageUrl,
      ctaLabel: source.ctaLabel,
      ctaUrl: source.ctaUrl,
      active: source.active,
      order: source.order,
      createdAt: source.createdAt,
      updatedAt: source.updatedAt,
    };
  }
  return { ...source };
}
