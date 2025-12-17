import { Controller, Post, Body } from '@nestjs/common';
import { Organization } from './organization.entity';

import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post('/')
  async createOrganization(
    @Body() body: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationService.create(body.code);
  }
}
