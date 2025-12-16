/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsUUID, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindMenusDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsNotEmpty({ message: '조직 ID는 비어있을 수 없습니다.' })
  @IsUUID('4', { message: '조직 ID는 유효한 UUID 형식이어야 합니다.' })
  orgId: string;
}
