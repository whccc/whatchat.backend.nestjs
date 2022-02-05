import { Body, Controller, Post } from '@nestjs/common';
import { PersonCreateDto } from './dto/personcreate.dto';
import { PersonService } from './person.service';

@Controller('Person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  public createPerson(@Body() personDTO: PersonCreateDto) {
    return this.personService.createPerson(personDTO);
  }
}
