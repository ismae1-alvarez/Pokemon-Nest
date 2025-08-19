import { IsInt,  IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {

    // isInt, isPositive, min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no: number;

    // isString, Minlent1
    @IsString()
    @MinLength(1, {
      message: 'Title is too short',  
    })
    name: string;

}
