// src/organization/organization.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [OrganizationService],
  controllers: [OrganizationController],
  exports: [TypeOrmModule.forFeature([Organization])],
})
export class OrganizationModule {}
