import { ApiModelProperty} from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateRaceDto {
  @ApiModelProperty({description: 'title of race', required: true, type: 'string', default: 'Egor at June', maxLength: 18, minLength: 2  })
  @IsNotEmpty()
  readonly title: string;
  @ApiModelProperty({description: 'description of race', required: true, type: 'string', default: '...', maxLength: 118, minLength: 2  })
  @IsNotEmpty()
  readonly description: string;
  @ApiModelProperty({description: 'time of race', required: true, type: 'number', default: 'Высшая' })
  @IsNotEmpty()
  @IsNumberString()
  readonly time: number;
  @ApiModelProperty({description: 'user at this race', required: true, type: 'string', default: '5da5d30873cd0b1bbcda8bfd', maxLength: 24, minLength: 24  })
  @IsNotEmpty()
  readonly userId: string;
  @ApiModelProperty({description: 'stage at this race', required: true, type: 'string', default: '5da5d30873cd0b1bbcda8bfd', maxLength: 24, minLength: 24  })
  @IsNotEmpty()
  readonly stageId: string;
}
