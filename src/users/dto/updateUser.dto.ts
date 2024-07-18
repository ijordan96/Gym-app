// export class CreateUserDto {
//     name : string; 
//     surname: string; 
//     age : number; 
//     birthdate : string; 
//     joined : string;
//      email : string; 
//      phoneNumber : string;
// }


import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsISO8601,
    IsOptional,
    IsDate,
    IsEmail
  } from 'class-validator';
   
  export class UpdateUserDto {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    surname: string; 
    
    @IsNumber()
    @IsOptional()
    age : number; 
    
    @IsDate()
    @IsOptional()
    birthdate : string; 
    
    @IsDate()
    @IsOptional()
    joined : string;
    
    
    @IsEmail()
    @IsOptional()
    email : string;
    
    
    @IsString()
    @IsOptional() 
    phoneNumber : string;
  }