import { ApiModelProperty} from '@nestjs/swagger';

export class CreateLeagueDto {
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly season: string;
  @ApiModelProperty()
  readonly usersId: string;
}
