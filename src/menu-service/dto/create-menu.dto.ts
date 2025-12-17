/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  IsUUID,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateMenuDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: '조직 ID는 비어있을 수 없습니다.' })
  @IsUUID('4', { message: '조직 ID는 유효한 UUID 형식이어야 합니다.' })
  orgId: string;

  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: '메뉴 이름은 비어있을 수 없습니다.' })
  @IsString({ message: '메뉴 이름은 문자열이어야 합니다.' })
  @MaxLength(64, { message: '메뉴 이름은 64자를 초과할 수 없습니다.' })
  name: string;

  @Type(() => Number)
  @IsNumber({}, { message: '가중치는 숫자여야 합니다.' })
  @Min(0, { message: '가중치는 0 이상이어야 합니다.' })
  dist?: number = 0;
}
