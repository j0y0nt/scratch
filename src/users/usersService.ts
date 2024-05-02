import { randomUUID } from "crypto";
import { UUID, User } from "./user";

// A post request should not contain an id
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService {
    public get(id: UUID, name?: string): User {
        return {
            id,
            email: "jane@doe.com",
            name: name ?? "Jane Doe",
            status: "Happy",
            phoneNumbers: [],
        };
    }
public create(userCreationParams: UserCreationParams) : User {
    return {
        id: randomUUID(), //random
        status: "Happy",
        ...userCreationParams,
    };
}
}