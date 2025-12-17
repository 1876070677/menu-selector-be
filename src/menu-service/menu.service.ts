import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { Organization } from '../organization-service/organization.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  /**
   * 데이터베이스에서 'menu' 테이블의 모든 레코드를 조회합니다.
   * @returns Menu 엔티티 객체의 배열 (Promise<Menu[]>)
   */
  async findByOrganization(orgId: string): Promise<Menu[]> {
    const menus = await this.menuRepository.find({
      where: {
        orgId: orgId,
      },
    });
    return menus;
  }

  /**
   * 새로운 메뉴를 데이터베이스에 삽입합니다.
   * @param orgId 조직 ID
   * @param name 메뉴 이름
   * @param dist 가중치
   * @param mealTicket 식권 사용 여부
   * @param category 카테고리
   * @returns 생성된 Menu 엔티티 객체 (Promise<Menu>)
   */
  async create(
    orgId: string,
    name: string,
    dist: number,
    mealTicket: boolean,
    category: 'KO' | 'JP' | 'CH' | 'ETC',
  ): Promise<Menu> {
    const organization = await this.organizationRepository.findOne({
      where: { id: orgId },
    });

    if (!organization) {
      throw new NotFoundException(
        `조직 ID ${orgId}에 해당하는 조직을 찾을 수 없습니다.`,
      );
    }

    const menu = this.menuRepository.create({
      orgId,
      name,
      dist,
      mealTicket,
      category,
    });
    return await this.menuRepository.save(menu);
  }

  /**
   * 메뉴를 부분 수정합니다.
   * @param menuId 메뉴 ID
   * @param name 메뉴 이름 (선택)
   * @param dist 가중치 (선택)
   * @param mealTicket 식권 사용 여부 (선택)
   * @param category 카테고리 (선택)
   * @returns 수정된 Menu 엔티티 객체 (Promise<Menu>)
   */
  async update(
    menuId: string,
    name?: string,
    dist?: number,
    mealTicket?: boolean,
    category?: 'KO' | 'JP' | 'CH' | 'ETC',
  ): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id: menuId },
    });

    if (!menu) {
      throw new NotFoundException(
        `메뉴 ID ${menuId}에 해당하는 메뉴를 찾을 수 없습니다.`,
      );
    }

    if (name !== undefined) {
      menu.name = name;
    }

    if (dist !== undefined) {
      menu.dist = dist;
    }

    if (mealTicket !== undefined) {
      menu.mealTicket = mealTicket;
    }

    if (category !== undefined) {
      menu.category = category;
    }

    return await this.menuRepository.save(menu);
  }

  /**
   * 메뉴를 삭제합니다.
   * @param menuId 메뉴 ID
   * @returns void (Promise<void>)
   */
  async delete(menuId: string): Promise<void> {
    const menu = await this.menuRepository.findOne({
      where: { id: menuId },
    });

    if (!menu) {
      throw new NotFoundException(
        `메뉴 ID ${menuId}에 해당하는 메뉴를 찾을 수 없습니다.`,
      );
    }

    await this.menuRepository.remove(menu);
  }
}
