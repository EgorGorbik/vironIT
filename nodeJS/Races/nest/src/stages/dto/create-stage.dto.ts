import { ApiModelProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStageDto {
  @ApiModelProperty({description: 'title of stage', required: true, type: 'string', default: 'June', maxLength: 2, minLength: 18  })
  @IsNotEmpty()
  readonly title: string;
  @ApiModelProperty({description: 'description of stage', required: true, type: 'string', default: '...', maxLength: 2, minLength: 24  })
  @IsNotEmpty()
  readonly description: string;
  @ApiModelProperty({description: 'location of stage', required: true, type: 'string', default: 'парк', maxLength: 2, minLength: 201  })
  @IsNotEmpty()
  readonly location: string;
  @IsNotEmpty()
  @ApiModelProperty({description: 'league of this stage', required: true, type: 'string', default: '5da5d30873cd0b1bbcda8bfd', maxLength: 24, minLength: 24  })
  readonly leagueId: string;
}
