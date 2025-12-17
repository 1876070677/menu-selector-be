/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateMenuDto {
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: '메뉴 이름은 문자열이어야 합니다.' })
  @MaxLength(64, { message: '메뉴 이름은 64자를 초과할 수 없습니다.' })
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: '가중치는 숫자여야 합니다.' })
  @Min(0, { message: '가중치는 0 이상이어야 합니다.' })
  dist?: number;
}
