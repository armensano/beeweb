import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Workspace } from 'src/types/workspace';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectModel('Workspace')
    private readonly workspaceModel: Model<Workspace>,
  ) {}

  async deleteUserFromWorkspace(
    userId: Types.ObjectId,
    workspaceId: Types.ObjectId,
    userToRemoveId: Types.ObjectId,
  ): Promise<any> {
    // TODO: check if user is owner of workspace separately
    const workspace = await this.workspaceModel.findOne({
      _id: workspaceId,
      owner: userId,
    });

    const users = workspace.users;
    const index = users.indexOf(userToRemoveId);
    if (index > -1) {
      users.splice(index, 1);
    }
    const update = await this.workspaceModel.updateOne(
      { _id: workspaceId },
      { users },
    );
    return update;
  }

  async addUserToWorkspace(
    ownerId,
    workspaceId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<any> {
    const result = await this.workspaceModel.updateOne(
      { _id: workspaceId, owner: ownerId },
      { $addToSet: { users: userId } },
    );
    return result;
  }

  async create(
    userId: Types.ObjectId,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<any> {
    const slag = createWorkspaceDto.slag.replace(' ', '_');
    const workspace = new this.workspaceModel({
      owner: userId,
      users: [userId],
      ...createWorkspaceDto,
      slag,
    });
    return await workspace.save();
  }

  async findAll(): Promise<any> {
    return await this.workspaceModel
      .find()
      .populate('channels')
      .populate('users', 'email');
  }

  async findOne(id: string): Promise<any> {
    const getOne = await this.workspaceModel
      .findOne({ _id: id })
      .populate('channels');
    return getOne;
  }

  async update(
    id: string,
    updateWorkspaceDto: UpdateWorkspaceDto,
  ): Promise<any> {
    const update = await this.workspaceModel.updateOne(
      { _id: id },
      updateWorkspaceDto,
    );
    return update;
  }

  async remove(id: string): Promise<any> {
    const result = await this.workspaceModel.deleteOne({ _id: id });
    return result;
  }
}
