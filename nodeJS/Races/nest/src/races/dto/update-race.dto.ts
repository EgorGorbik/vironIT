import { ApiModelProperty} from '@nestjs/swagger';

export class UpdateRaceDto {
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly time: number;
  @ApiModelProperty()
  readonly userId: string;
  @ApiModelProperty()
  readonly stageId: string;
}
