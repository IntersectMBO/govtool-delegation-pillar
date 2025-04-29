import { IsEnum, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export enum DRepType {
  DRep = 'DRep',
  DirectVoter = 'DirectVoter',
}

export enum DRepStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Retired = 'Retired',
}

export enum DRepSort {
  Random = 'Random',
  VotingPower = 'VotingPower',
  RegistrationDate = 'RegistrationDate',
  Status = 'Status',
}

export class DRepListParamsDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number })
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number })
  pageSize?: number;

  @IsOptional()
  @Transform(({ value }) => {
    return Array.isArray(value) ? value : value ? [value] : [];
  })
  @IsEnum(DRepStatus, { each: true })
  @ApiPropertyOptional({ isArray: true, enum: DRepStatus })
  status?: DRepStatus[];

  @IsOptional()
  @IsEnum(DRepSort)
  @ApiPropertyOptional({ enum: DRepSort })
  sort?: DRepSort;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Search by DRep view or raw id',
  })
  search?: string;
}
