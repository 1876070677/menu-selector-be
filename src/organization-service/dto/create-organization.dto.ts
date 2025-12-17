/* eslint-disable @typescript-eslint/no-unsafe-return */

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateOrganizationDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: '조직 코드는 비어있을 수 없습니다.' })
  @IsString({ message: '조직 코드는 문자열이어야 합니다.' })
  @MaxLength(64, { message: '조직 코드는 64자를 초과할 수 없습니다.' })
  code: string;
}
