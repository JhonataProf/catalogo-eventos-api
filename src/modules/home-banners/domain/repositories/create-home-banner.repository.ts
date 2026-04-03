import { HomeBannerEntity, HomeBannerProps } from "../entities/home-banner.entity";

export interface CreateHomeBannerRepository {
  create(homeBanner: Omit<HomeBannerProps, "id">): Promise<HomeBannerEntity | null>;
}
