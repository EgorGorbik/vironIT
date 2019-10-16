import { ApiModelProperty} from '@nestjs/swagger';

export class CreateStageDto {
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly location: string;
  @ApiModelProperty()
  readonly leagueId: string;
}
