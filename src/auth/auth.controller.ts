import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RegisterDTO } from 'src/user/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { CREATE_UPDATE_SCENT_FILE_TYPES } from 'src/auth/constants';
import { multerOptions } from 'src/files/config/multer-options';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor(CREATE_UPDATE_SCENT_FILE_TYPES, multerOptions),
  )
  async register(
    @Body() registerDTO: RegisterDTO,
    @UploadedFiles() image: any,
  ) {
    const user = await this.userService.create(
      registerDTO,
      image.image[0].filename,
    );
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.userService.findByLogin(loginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
