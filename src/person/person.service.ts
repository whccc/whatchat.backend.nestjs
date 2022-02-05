import { Injectable } from '@nestjs/common';
import { Person } from 'src/entity/person.entity';
import { PersonCreateDto } from './dto/personcreate.dto';
import { IPersonService } from './interfaces/personservice.interface';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService implements IPersonService {
  constructor(private readonly personRepository: PersonRepository) {}

  public createPerson(PersonDTO: PersonCreateDto): Promise<Person> {
    return this.personRepository.createPerson(PersonDTO);
  }
}
