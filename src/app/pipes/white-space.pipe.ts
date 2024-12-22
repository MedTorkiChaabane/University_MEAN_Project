import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whiteSpace'
})
export class WhiteSpacePipe implements PipeTransform {

  transform(chaine:any): any {
    var chaine_sans_doubles = '';
    var est_dans_mot = false;
  
    for (var i = 0; i < chaine.length; i++) {
      var caractere = chaine[i];
    
      if (caractere == ' ') {
        if (est_dans_mot) {
          chaine_sans_doubles += ' ';
          est_dans_mot = false;
        }
      } else {
        chaine_sans_doubles += caractere;
        est_dans_mot = true;
      }
    }
  
    return chaine_sans_doubles;

    //return chaine.replace(/\s+/g, ' ');
  }

}
