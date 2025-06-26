import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsISO8601,
    IsOptional,
    IsDate,
    IsEmail
  } from 'class-validator';
   
  export class UpdateAdminDto {
    @IsString()
    id: number;

    @IsString()
    @IsOptional()
    surname: string;   
    
    @IsEmail()
    @IsOptional()
    email : string;
    
    
    @IsString()
    @IsOptional() 
    phoneNumber : string;

    @IsString()
    @IsOptional() 
    password : string;

  }