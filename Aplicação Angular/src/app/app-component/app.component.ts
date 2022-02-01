import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './dialog/dialog-app.component';

const GITHUB_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
const LINKEDIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`;

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  title = 'Consulta Dados Públicos IFPR';
  public formArray: FormArray;
  public formArrayFilter: any = [];
  private readonly urlProjetos =
    'http://localhost:3000/Dados/projetos-de-pesquisa-extensao-e-inovacao';

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    iconRegistry.addSvgIconLiteral(
      'github',
      sanitizer.bypassSecurityTrustHtml(GITHUB_ICON)
    );
    iconRegistry.addSvgIconLiteral(
      'linkedin',
      sanitizer.bypassSecurityTrustHtml(LINKEDIN_ICON)
    );

    this.form = new FormGroup({
      search: new FormControl(null),
    });

    this.form.get('search')?.valueChanges.subscribe((value) => {
      this.filterSearch(value);
    });

    this.formArray = new FormArray([]);
  }

  ngOnInit(): void {
    this.getDadosProjetos();
  }

  getDadosProjetos() {
    fetch(this.urlProjetos, { method: 'GET', mode: 'cors' })
      .then((response) => response.json())
      .then((json) => {
        this.trataDadosProjeto(json);
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  trataDadosProjeto(data: any) {
    for (let i = 0; i < data.length; i++) {
      this.formArray.push(
        new FormGroup({
          id_projeto: new FormControl(null),
          nomecampus: new FormControl(null),
          titulo: new FormControl(null),
          nometipoprojeto: new FormControl(null),
          datainicio: new FormControl(null),
          datatermino: new FormControl(null),
          areaextensao: new FormControl(null),
          linhaextensao: new FormControl(null),
          tipoacaoextensao: new FormControl(null),
          areapesquisa: new FormControl(null),
          participantes: new FormArray([]),
        })
      );

      if (data[i].participantes) {
        for (let j = 0; j < data[i].participantes.length; j++) {
          let form_array_participantes = this.formArray
            .at(i)
            .get('participantes') as FormArray;

          form_array_participantes.push(
            new FormGroup({
              nomepessoa: new FormControl(null),
              nometipopessoa: new FormControl(null),
              nometipoparticipacao: new FormControl(null),
              cargahoraria: new FormControl(null),
            })
          );
        }
      }

      this.formArrayFilter.push(data[i]);
    }

    this.formArray.patchValue(data);
  }

  onClickLinkedin() {
    window.open(
      'https://www.linkedin.com/in/juliano-augusto-5b1693198/',
      '_blank'
    );
  }

  onClickGithub() {
    window.open('https://github.com/JulianoReactNative', '_blank');
  }

  openDialog(data: any) {
    this.dialog.open(DialogData, {
      data: data,
    });
  }

  filterSearch(value: any) {
    if (!value) {
      this.formArrayFilter = this.formArray.value;
    } else {
      this.formArrayFilter = this.formArray.value;
      let words = value.toLowerCase().split(' ');
      for (let a = 0; a < words.length; a++) {
        this.formArrayFilter = this.formArrayFilter.filter(
          (dados: any) =>
            dados.nometipoprojeto.toUpperCase().indexOf(words[a].toUpperCase()) !== -1 ||
            dados.titulo.toUpperCase().indexOf(words[a].toUpperCase()) !== -1 ||
            dados.nomecampus.toUpperCase().indexOf(words[a].toUpperCase()) !== -1
        );
      }
    }
  }

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
