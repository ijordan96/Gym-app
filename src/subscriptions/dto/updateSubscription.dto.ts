import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
  } from 'class-validator';
   
  export class UpdateSubscriptionDto {

    @IsString()
    id: string; 

    @IsString()
    @IsOptional()
    name: string; 
    
    @IsNumber()
    @IsOptional()
    value : number;
     
    @IsString()
    @IsOptional() 
    description : string;
  }