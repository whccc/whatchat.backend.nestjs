import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class HelpersFunctions {
  public async converBase64ToFile(dataBase64, nameFile): Promise<void> {
    let base64Image = dataBase64.split(';base64,').pop();
    await fs.writeFileSync(`pictures/${nameFile}`, base64Image, {
      encoding: 'base64',
    });
  }
}
