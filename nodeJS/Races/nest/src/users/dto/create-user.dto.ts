import { ApiModelProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly surname: string;
  @ApiModelProperty()
  readonly username: string;
}
