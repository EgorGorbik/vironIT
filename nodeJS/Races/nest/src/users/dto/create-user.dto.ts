import { ApiModelProperty} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty({description: 'name of user', required: true, type: 'string', default: 'Egor', maxLength: 18, minLength: 2  })
  @IsNotEmpty()
  readonly name: string;
  @ApiModelProperty({description: 'surname of user', required: true, type: 'string', default: 'Ivanov', maxLength: 18, minLength: 2  })
  @IsNotEmpty()
  readonly surname: string;
  @ApiModelProperty({description: 'username of user', required: true, type: 'string', default: 'e.gorbik', maxLength: 18, minLength: 2  })
  @IsNotEmpty()
  readonly username: string;
}
