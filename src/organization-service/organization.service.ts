import { Injectable, ConflictException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  /**
   * 새로운 조직을 데이터베이스에 삽입합니다.
   * @param code 조직 코드
   * @returns 생성된 Organization 엔티티 객체 (Promise<Organization>)
   */
  async create(code: string): Promise<Organization> {
    const existingOrg = await this.organizationRepository.findOne({
      where: { code },
    });

    if (existingOrg) {
      throw new ConflictException(
        `조직 코드 '${code}'는 이미 존재합니다.`,
      );
    }

    const organization = this.organizationRepository.create({
      code,
    });
    return await this.organizationRepository.save(organization);
  }
}
