import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf and *ngFor

@Component({
  selector: 'med-perfil-anamnese',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-anamnese.component.html',
  styleUrl: './perfil-anamnese.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilAnamneseComponent implements OnInit {
  medicalHistory = {
    basicInfo: {
      bloodType: 'A+',
      weight: '75 kg',
      height: '1.75 m',
      imc: '24.49', // Placeholder calculation: 75 / (1.75 * 1.75)
      chronicDiseases: ['Hipertensão (controlada)', 'Asma (leve)'],
      hospitalizations: [{ date: '2010-03-15', reason: 'Apêndicectomia' }],
      currentTreatments: ['Losartana 50mg/dia', 'Bombinha de Salbutamol (conforme necessidade)'],
    },
    allergies: {
      medications: ['Penicilina (reação alérgica grave)'],
      food: ['Amendoim'],
      others: ['Pólen'],
      noKnownAllergies: false,
    },
    medications: [
      { name: 'Losartana', dosage: '50mg', frequency: '1x ao dia', reason: 'Hipertensão' },
      { name: 'Salbutamol (bombinha)', dosage: '2 puffs', frequency: 'Conforme necessidade', reason: 'Asma' },
    ],
    pastIllnessesSurgeries: [
      { type: 'Cirurgia', name: 'Apêndicectomia', date: '2010-03-15' },
      { type: 'Doença', name: 'Varicela (Catapora)', date: 'Infância' },
    ],
    familyHistory: [
      { relationship: 'Pai', condition: 'Hipertensão, Diabetes Tipo 2' },
      { relationship: 'Mãe', condition: 'Doença Coronariana' },
    ],
    lifestyle: {
      smoker: 'Não',
      alcohol: 'Socialmente',
      physicalActivity: '3x semana (Caminhada)',
      diet: 'Equilibrada, com restrição de sal',
    },
    vaccinations: [
      { name: 'Gripe', date: '2023-04-01' },
      { name: 'Tétano', date: '2020-08-20' },
      { name: 'COVID-19', date: '2021-06-10 (Dose 1), 2021-08-10 (Dose 2), 2022-03-05 (Reforço)' },
    ]
  };

  constructor() { }

  ngOnInit(): void {
    // In a real application, you'd fetch this data from a service
  }
}
