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
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { GetUser } from 'src/shared/get-user';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @GetUser() user: any,
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<any> {
    return this.channelService.create(user._id, createChannelDto);
  }

  @Get()
  findAll(): Promise<any> {
    return this.channelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.channelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChannelDto: UpdateChannelDto,
  ): Promise<any> {
    return this.channelService.update(id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<any> {
    return this.channelService.remove(id);
  }
}
