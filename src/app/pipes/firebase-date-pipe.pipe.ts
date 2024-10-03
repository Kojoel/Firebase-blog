import { Pipe, PipeTransform } from '@angular/core';
import { firestore } from '@angular/'

@Pipe({
  name: 'firebaseDatePipe',
  standalone: true
})
export class FirebaseDatePipePipe implements PipeTransform {

  transform(value: firestore.Timestamp | any): Date | null {
    return value instanceof firestore.Timestamp ? value.toDate() : null;
  }

}
