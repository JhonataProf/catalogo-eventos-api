import { ListUsersUseCase } from "@/modules/users/application/use-cases/list-users.usecase";
import { UserEntity } from "@/modules/users/domain/entities/user.entity";
import { ListUsersRepository } from "@/modules/users/domain/repositories/list-users.repository";

describe("ListUsersUseCase", () => {
  const makeSut = () => {
    const listRepoMock: ListUsersRepository = {
      findAll: jest.fn(async () => [
        new UserEntity({
          id: 1,
          name: "User 1",
          email: "user1@example.com",
          password: "hash1",
          role: "Admin",
        }),
        new UserEntity({
          id: 2,
          name: "User 2",
          email: "user2@example.com",
          password: "hash2",
          role: "Admin",
        }),
      ]),
    };

    const sut = new ListUsersUseCase(listRepoMock);

    return { sut, listRepoMock };
  };

  it("deve retornar a lista de usuários vinda do repositório", async () => {
    const { sut, listRepoMock } = makeSut();

    const result = await sut.execute();

    expect(listRepoMock.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);

    const first = result[0]!;
    expect(first.email).toBe("user1@example.com");
  });
});
