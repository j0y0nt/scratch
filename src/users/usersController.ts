import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Response,
    SuccessResponse
} from 'tsoa';
import { User } from './user';
import { UsersService, UserCreationParams } from './usersService';

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("users")
export class UserController extends Controller {
    @Get("{userId}")
    public async getUser(
        @Path() userId: number,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(userId, name);
    }

    @Response<ValidateErrorJSON>(422, "Validation Error.")
    @SuccessResponse("201", "Created")
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201);
        new UsersService().create(requestBody);
        return;
    }
}