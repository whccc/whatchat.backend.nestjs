import { Person } from 'src/entity/person.entity';
import { PersonCreateDto } from '../dto/personcreate.dto';

export interface IPersonService {
  createPerson(PersonDTO: PersonCreateDto): Promise<Person>;
}
