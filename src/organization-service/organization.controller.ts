import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { Organization } from './organization.entity';

import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationCodeParamDto } from './dto/organization-code.param.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get(':code')
  async getOrganizationByCode(
    @Param() params: OrganizationCodeParamDto,
  ): Promise<Organization> {
    const organization = await this.organizationService.findByCode(params.code);
    if (!organization) {
      throw new NotFoundException(
        `조직 코드 '${params.code}'를 찾을 수 없습니다.`,
      );
    }
    return organization;
  }

  @Post('/')
  async createOrganization(
    @Body() body: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationService.create(body.code);
  }
}
