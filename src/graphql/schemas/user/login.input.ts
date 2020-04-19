import { InputType, Field } from '@nestjs/graphql';

@InputType({
  description: '登录账号'
})
export class LoginInput {
  @Field({ description: '用户名', nullable: false })
  username: string;

  @Field({ description: '密码', nullable: false })
  password: string;
}
