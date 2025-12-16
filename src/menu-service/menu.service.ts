import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  /**
   * 데이터베이스에서 'menu' 테이블의 모든 레코드를 조회합니다.
   * @returns Menu 엔티티 객체의 배열 (Promise<Menu[]>)
   */
  async findByOrganization(orgId: string): Promise<Menu[]> {
    const menus = await this.menuRepository.find({
      where: {
        orgId: { id: orgId },
      },
      relations: ['orgId'],
    });
    return menus;
  }
}
