import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Response,
    SuccessResponse,
    Example
} from 'tsoa';
import { UUID, User } from './user';
import { UsersService, UserCreationParams } from './usersService';

interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

@Route("users")
export class UserController extends Controller {

    /**
     * Retrieve the details of an existing user.
     * Get the user ID from request path and return user detail.
     * 
     * @param userId The unique user identifier
     * @param name Name of the user
     * @returns User details.
     * 
     *  @example userId "52907745-7672-470e-a803-a2f8feb52944"
    *   @example userId "e77ef155-bd12-46f0-8559-bf55f6dd4c63"
     */
    @Example<User>({
        id: "52907745-7672-470e-a803-a2f8feb52944",
        name: "tsoa user",
        email: "hello@tsoa.com",
        phoneNumbers: [],
        status: "Happy",
      })
    @Get("{userId}")
    public async getUser(
        @Path() userId: UUID,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(userId, name);
    }

    /**
     * 
     * @param requestBody Creates a new user.
     * @returns 201 status code.
     */
    @Response<ValidateErrorJSON>(422, "Validation Error.",{
        message: "Validation failed",
        details: {
            requestBody: {
                message: "id is an excess property and therefore not allowed",
                value: "52907745-7672-470e-a803-a2f8feb52944",
            },
        },
    })
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