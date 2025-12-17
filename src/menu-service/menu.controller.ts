import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Menu } from 'src/menu-service/menu.entity';

import { MenuService } from './menu.service';
import { FindMenusDto } from './dto/find-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('/:orgId/menus')
  async getMenus(@Param() params: FindMenusDto): Promise<Menu[]> {
    return await this.menuService.findByOrganization(params.orgId);
  }

  @Post('/')
  async createMenu(@Body() body: CreateMenuDto): Promise<Menu> {
    return await this.menuService.create(body.orgId, body.name, body.dist ?? 0);
  }

  @Patch('/:menuId')
  async updateMenu(
    @Param('menuId') menuId: string,
    @Body() body: UpdateMenuDto,
  ): Promise<Menu> {
    return await this.menuService.update(menuId, body.name, body.dist);
  }

  @Delete('/:menuId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMenu(@Param('menuId') menuId: string): Promise<void> {
    return await this.menuService.delete(menuId);
  }
}
