# 数据库模型

`src/database/entities`目录存放数据库对象映射模型（typeorm），一个模型对应一个数据表。模型可以同时用作`graphql`类型

## 添加模型

1. 创建一个类。并添加与数据库一致的字段；
2. 添加类装饰器。类装饰器`@Entity({ name: 'test_user' })`，`name`选项缺省值为类名，如果类名和表名不一致，必须设定`name`变量。
3. 添加成员变量装饰器。`@Column`

实例：

```typescript
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GenderEnum } from '../../enums/gender.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType({
  description: '用户信息',
})
@Entity({
  name: 'test_user', // 表名
})
export class UserEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: '用户名' })
  @Column()
  username: string;

  @Field({ description: '昵称' })
  @Column()
  nickname: string;

  @Column()
  password: string;

  @Field(type => GenderEnum, { description: '性别' })
  @Column()
  gender: GenderEnum;

  @Field()
  @Column({ type: 'datetime' })
  created_at: Date;

  @Field()
  @Column({ type: 'datetime' })
  updated_at: Date;

  @Field()
  @Column({ type: 'datetime' })
  deleted_at: Date;
}
```

## 相关文档

* typrorm [https://typeorm.io/](https://typeorm.io/)
* type-graphql [https://typegraphql.ml/](https://typegraphql.ml/)
