import { HomeBannerEntity } from "@/modules/home-banners/domain/entities/home-banner.entity";
import { toHomeBannerHttpPayload } from "@/modules/home-banners/presentation/http/mappers/home-banner-response.mapper";

describe("toHomeBannerHttpPayload", () => {
  it("serializa entidade para objeto enumerável (JSON)", () => {
    const createdAt = new Date("2024-01-01T00:00:00.000Z");
    const updatedAt = new Date("2024-01-02T00:00:00.000Z");
    const entity = new HomeBannerEntity({
      id: 1,
      title: "T",
      subtitle: "S",
      imageUrl: "https://i.png",
      ctaLabel: "Ir",
      ctaUrl: "https://c",
      active: true,
      order: 0,
      createdAt,
      updatedAt,
    });
    const payload = toHomeBannerHttpPayload(entity);
    expect(JSON.stringify(payload)).toContain("T");
    expect(payload).toEqual({
      id: 1,
      title: "T",
      subtitle: "S",
      imageUrl: "https://i.png",
      ctaLabel: "Ir",
      ctaUrl: "https://c",
      active: true,
      order: 0,
      createdAt,
      updatedAt,
    });
  });

  it("preserva objeto já plano (ex.: mocks de teste)", () => {
    const plain = {
      id: 2,
      title: "P",
      subtitle: "",
      imageUrl: "",
      ctaLabel: "",
      ctaUrl: "",
      active: false,
      order: 1,
    };
    expect(toHomeBannerHttpPayload(plain)).toEqual(plain);
  });
});
