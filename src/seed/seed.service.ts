import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-repsonse.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {

  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){}
  private readonly axios: AxiosInstance = axios;



  async executeSeed() {

    // first delete data
    await this.pokemonModel.deleteMany({});

    const { data } = await axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");

    // ejemplo de una forma primer forma
    // const insertPromiseArray:Promise<Pokemon>[] = [];

    const pokermonToInsert: {name:string, no:number}[] =[]

    data.results.forEach(({ name, url})=> {
      const segments = url.split('/');

      const no:number = +segments[ segments.length - 2];

      // De la prier forma
      // insertPromiseArray.push(
      //   this.pokemonModel.create({ name, no })
      // )

      pokermonToInsert.push({name, no});
    })

    // Primer forma
    // await Promise.all(insertPromiseArray);

    
    await this.pokemonModel.insertMany(pokermonToInsert)


    return 'Seed Executed';
  }
}
