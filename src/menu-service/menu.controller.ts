import { Controller, Get, Param } from '@nestjs/common';
import { Menu } from 'src/menu-service/menu.entity';

import { MenuService } from './menu.service';
import { FindMenusDto } from './dto/find-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/:orgId/menus')
  async getMenus(@Param() params: FindMenusDto): Promise<Menu[]> {
    return await this.menuService.findByOrganization(params.orgId);
  }
}
