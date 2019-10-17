import { createParamDecorator } from '@nestjs/common';

export const UserDec = createParamDecorator((data, req) => {
  return data ? req.user[data] : req.user;
})
