import User from '../model/User';
import * as bcrypt from 'bcrypt';
import * as EmailValidator from 'email-validator';
import {Container, Service} from 'typedi';
import UserDTO from '../dto/UserDTO';
import {BadRequestError, InternalServerError, NotFoundError} from "routing-controllers";
import UserCreateRequestDTO from "../dto/UserCreateRequestDTO";
import UserCreateResponseDTO from "../dto/UserCreateResponseDTO";
import AuthenticationService from "../integration/AuthenticationService";

@Service()
export default class UserService {

    private client: AuthenticationService;

    constructor() {
        this.client = Container.get(AuthenticationService);
    }

    /**
     * Encrypt a plain text password using the BCrypt algorithm.
     * @param plainTextPassword The password to be encrypted.
     */
    private static async generatePassword(plainTextPassword: string): Promise<string> {
        const saltRounds = 10;
        let salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plainTextPassword, salt);
    }

    /**
     * Persists a new user into the database.
     * @param request The object containing the user information to be persisted.
     * @return The created user if success.
     */
    public async create(request: UserCreateRequestDTO): Promise<UserCreateResponseDTO> {
        const email = request.email;
        const password = request.password;

        if (!EmailValidator.validate(email)) {
            throw new BadRequestError('Email is required or malformed.');
        }
        if (!password) {
            throw new BadRequestError('Password is required.');
        }
        const user = await User.findByPk(email);
        if (user) {
            throw new BadRequestError('User may already exist.');
        }

        try {
            const user = await new User({
                email: email,
                passwordHash: await UserService.generatePassword(password)
            });
            const jwt = await this.client.createJwtToken(email);
            await user.save();

            return new UserCreateResponseDTO(jwt.token, email);
        } catch (error) {
            throw new InternalServerError('Error while persisting user into database. ' + error.message);
        }
    }

    /**
     * Search for a specific user by its identifier.
     * @param id The user identifier.
     * @return The user if found.
     */
    public async findById(id: string): Promise<UserDTO> {
        return User.findByPk(id).then((user) => {
            return {
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
        }).catch(() => {
            throw new NotFoundError("User not found.");
        });
    }
}
