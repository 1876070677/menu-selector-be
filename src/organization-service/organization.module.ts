// src/organization/organization.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule.forFeature([Organization])],
})
export class OrganizationModule {}
