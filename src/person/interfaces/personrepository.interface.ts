import { Person } from 'src/entity/person.entity';
import { PersonCreateDto } from '../dto/personcreate.dto';

export interface IPersonRepository {
  createPerson(PersonDto: PersonCreateDto): Promise<Person>;
}
