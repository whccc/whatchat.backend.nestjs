import { Person } from 'src/entity/person.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PersonCreateDto } from './dto/personcreate.dto';
import { IPersonRepository } from './interfaces/personrepository.interface';

@EntityRepository(Person)
export class PersonRepository
  extends Repository<Person>
  implements IPersonRepository
{
  public async createPerson(PersonDTO: PersonCreateDto): Promise<Person> {
    const person = Person.create(PersonDTO);
    await person.save();
    return person;
  }
}
