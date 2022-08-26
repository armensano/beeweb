import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelSchema } from 'src/models/channel.schema';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService],
  imports: [
    MongooseModule.forFeature([{ name: 'Channel', schema: ChannelSchema }]),
  ],
})
export class ChannelModule {}
