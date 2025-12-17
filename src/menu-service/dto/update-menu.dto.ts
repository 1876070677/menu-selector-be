/* eslint-disable @typescript-eslint/no-unsafe-return */

import {
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
  IsBoolean,
  IsIn,
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

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: '식권 사용 여부는 불리언이어야 합니다.' })
  mealTicket?: boolean;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString({ message: '카테고리는 문자열이어야 합니다.' })
  @IsIn(['KO', 'JP', 'CH', 'ETC'], {
    message: '카테고리는 KO, JP, CH, ETC 중 하나여야 합니다.',
  })
  category?: 'KO' | 'JP' | 'CH' | 'ETC';
}
