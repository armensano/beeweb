import { Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceSchema } from 'src/models/workspace.schema';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: [
    MongooseModule.forFeature([{ name: 'Workspace', schema: WorkspaceSchema }]),
  ],
})
export class WorkspaceModule {}
