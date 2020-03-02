import 'reflect-metadata';
import {Body, Get, JsonController, Param, Post} from 'routing-controllers';
import {Inject} from 'typedi';
import UserService from '../service/UserService';
import UserDTO from '../dto/UserDTO';
import UserCreateRequestDTO from "../dto/UserCreateRequestDTO";
import UserCreateResponseDTO from "../dto/UserCreateResponseDTO";

@JsonController('/users')
export default class UserController {

    @Inject()
    private userService: UserService;

    @Post()
    public create(@Body() request: UserCreateRequestDTO): Promise<UserCreateResponseDTO> {
        return this.userService.create(request);
    }

    @Get('/:id')
    public async findById(@Param('id') id: string): Promise<UserDTO> {
        return this.userService.findById(id);
    }
}
