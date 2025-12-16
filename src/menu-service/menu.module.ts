import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { OrganizationModule } from 'src/organization-service/organization.module';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), OrganizationModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
