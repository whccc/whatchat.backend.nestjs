import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class HelpersFunctions {
  public converBase64ToFile(dataBase64, nameFile): void {
    const base64Image = dataBase64.split(';base64,').pop();
    fs.writeFileSync(`pictures/${nameFile}`, base64Image, {
      encoding: 'base64',
    });
  }

  public convertFileToBAse64(fileName: string): string {
    const file = fs.readFileSync(`pictures/${fileName}`);
    return file.toString('base64');
  }
}
