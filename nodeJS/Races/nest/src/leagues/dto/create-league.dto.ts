import { ApiModelProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLeagueDto {
  @ApiModelProperty({description: 'title of league', required: true, type: 'string', default: 'Высшая', maxLength: 18, minLength: 2  })
  @IsNotEmpty()
  readonly title: string;
  @ApiModelProperty({description: 'description of league', required: true, type: 'string', default: 'наилучшая лига', maxLength: 205, minLength: 2  })
  @IsNotEmpty()
  readonly description: string;
  @ApiModelProperty({description: 'season of league', required: true, type: 'string', default: 'summer', enum: ['winter', 'summer', 'spring', 'autumn']  })
  @IsNotEmpty()
  readonly season: string;
  @ApiModelProperty({description: 'users at this league', required: true, type: 'string', default: '5da5d30873cd0b1bbcda8bfd', maxLength: 24, minLength: 24  })
  @IsNotEmpty()
  readonly usersId: string;
}
