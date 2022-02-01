import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-app.component',
  templateUrl: 'dialog-app.component.html',
  styleUrls: ['./dialog-app.component.scss'],
})

export class DialogData {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  formatText(text: String) {
    if (text && text !== '') {
      let words = text.toLowerCase().split(' ');
      for (let a = 0; a < words.length; a++) {
        if (words[a]) {
          let w = words[a];
          words[a] = w[0].match(/[a-z]/i)
            ? w[0].toUpperCase() + w.slice(1)
            : w[1]
            ? w[0] + w[1].toUpperCase() + w.slice(2)
            : w[0];
        }
      }
      return words.join(' ');
    } else {
      return 'Não Informado';
    }
  }
}
