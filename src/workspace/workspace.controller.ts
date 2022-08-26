import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { GetUser } from 'src/shared/get-user';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Types } from 'mongoose';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post('addUser')
  @UseGuards(AuthGuard('jwt'))
  addUserToWorkspace(
    @GetUser() user: any,
    @Body('workspaceId') workspaceId: Types.ObjectId,
    @Body('userId') userId: Types.ObjectId,
  ): Promise<any> {
    return this.workspaceService.addUserToWorkspace(
      user.id,
      workspaceId,
      userId,
    );
  }

  @Delete('removeUser')
  @UseGuards(AuthGuard('jwt'))
  deleteUserFromWorkspace(
    @GetUser() user: any,
    @Body('workspaceId') workspaceId: Types.ObjectId,
    @Body('userId') userId: Types.ObjectId,
  ): Promise<any> {
    return this.workspaceService.deleteUserFromWorkspace(
      user.id,
      workspaceId,
      userId,
    );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @GetUser() user: any,
    @Body() createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<any> {
    return this.workspaceService.create(user._id, createWorkspaceDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<any> {
    return this.workspaceService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string): Promise<any> {
    return this.workspaceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<any> {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.workspaceService.remove(id);
  }
}
