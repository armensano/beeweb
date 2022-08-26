import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelSchema } from 'src/models/channel.schema';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel('Channel')
    private readonly channelModel: Model<typeof ChannelSchema>,
  ) {}
  async create(userId: string, createChannelDto: CreateChannelDto) {
    const channel = new this.channelModel({ userId, ...createChannelDto });
    return channel.save();
  }

  async findAll(): Promise<any> {
    return await this.channelModel.find().populate('workspace');
  }

  async findOne(id: string): Promise<any> {
    return await this.channelModel.findOne({ _id: id }).populate('workspace');
  }

  async update(id: string, updateChannelDto: UpdateChannelDto): Promise<any> {
    return await this.channelModel.updateOne({ _id: id }, updateChannelDto);
  }

  async remove(id: string): Promise<any> {
    return await this.channelModel.deleteOne({ _id: id });
  }
}
