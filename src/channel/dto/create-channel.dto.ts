import { IsString } from 'class-validator';

export class CreateChannelDto {
  @IsString()
  name: string;

  @IsString()
  workspace: string;
}
