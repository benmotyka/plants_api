import { Plant } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreatePlantRequestDto } from './dto/CreatePlantRequest.dto';
import { CreatePlantResponseResponseDto } from './dto/CreatePlantResponse.dto';
import { EditPlantRequestDto } from './dto/EditPlantRequest.dto';
import { GetAllPlantsResponseDto } from './dto/GetAllPlantsResponse.dto';
import { PlantService } from './plant.service';

@Controller('plants')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}
  private readonly logger = new Logger(PlantController.name);

  @Get('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllPlants(@Request() req): Promise<GetAllPlantsResponseDto> {
    this.logger.debug(`Getting all plants for user: ${req.user.username}`)
    const plants = await this.plantService.getAllPlants(req.user)

    return new GetAllPlantsResponseDto(plants)
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createPlant(
    @Body() createPlantRequestDto: CreatePlantRequestDto,
    @Request() req,
  ): Promise<CreatePlantResponseResponseDto> {
    this.logger.debug(`Creating plant for user: ${req.user.username}`)
    const plant = await this.plantService.createPlant(
      createPlantRequestDto,
      req.user,
    );

    return new CreatePlantResponseResponseDto(plant)
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  async editPlant(
    @Body() editPlantRequestDto: EditPlantRequestDto,
    @Request() req,
  ): Promise<string> {
    this.logger.debug(`Updating plant for user: ${req.user.username}`)
    const result = await this.plantService.editPlant(
      editPlantRequestDto,
      req.user,
    );
    return 'ok';
  }
}
