import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf and *ngFor
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { take } from 'rxjs';

interface Hospitalization {
  date: string;
  reason: string;
}

interface BasicInfo {
  bloodType: string;
  weight: string;
  height: string;
  imc: string;
  chronicDiseases: string[];
  hospitalizations: Hospitalization[];
  currentTreatments: string[];
}

interface Allergies {
  medications: string[];
  food: string[];
  others: string[];
  noKnownAllergies: boolean;
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  reason: string;
}

interface PastIllnessSurgery {
  type: string;
  name: string;
  date: string;
}

interface FamilyHistory {
  relationship: string;
  condition: string;
}

interface Lifestyle {
  smoker: string;
  alcohol: string;
  physicalActivity: string;
  diet: string;
}

interface Vaccination {
  name: string;
  date: string;
}

export interface MedicalHistory {
  basicInfo: BasicInfo;
  allergies: Allergies;
  medications: Medication[];
  pastIllnessesSurgeries: PastIllnessSurgery[];
  familyHistory: FamilyHistory[];
  lifestyle: Lifestyle;
  vaccinations: Vaccination[];
}

@Component({
  selector: 'med-perfil-anamnese',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil-anamnese.component.html',
  styleUrl: './perfil-anamnese.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PerfilAnamneseComponent implements OnInit {
  // medicalHistory = {
  //   basicInfo: {
  //     bloodType: 'A+',
  //     weight: '75 kg',
  //     height: '1.75 m',
  //     imc: '24.49', // Placeholder calculation: 75 / (1.75 * 1.75)
  //     chronicDiseases: ['Hipertensão (controlada)', 'Asma (leve)'],
  //     hospitalizations: [{ date: '2010-03-15', reason: 'Apêndicectomia' }],
  //     currentTreatments: ['Losartana 50mg/dia', 'Bombinha de Salbutamol (conforme necessidade)'],
  //   },
  //   allergies: {
  //     medications: ['Penicilina (reação alérgica grave)'],
  //     food: ['Amendoim'],
  //     others: ['Pólen'],
  //     noKnownAllergies: false,
  //   },
  //   medications: [
  //     { name: 'Losartana', dosage: '50mg', frequency: '1x ao dia', reason: 'Hipertensão' },
  //     { name: 'Salbutamol (bombinha)', dosage: '2 puffs', frequency: 'Conforme necessidade', reason: 'Asma' },
  //   ],
  //   pastIllnessesSurgeries: [
  //     { type: 'Cirurgia', name: 'Apêndicectomia', date: '2010-03-15' },
  //     { type: 'Doença', name: 'Varicela (Catapora)', date: 'Infância' },
  //   ],
  //   familyHistory: [
  //     { relationship: 'Pai', condition: 'Hipertensão, Diabetes Tipo 2' },
  //     { relationship: 'Mãe', condition: 'Doença Coronariana' },
  //   ],
  //   lifestyle: {
  //     smoker: 'Não',
  //     alcohol: 'Socialmente',
  //     physicalActivity: '3x semana (Caminhada)',
  //     diet: 'Equilibrada, com restrição de sal',
  //   },
  //   vaccinations: [
  //     { name: 'Gripe', date: '2023-04-01' },
  //     { name: 'Tétano', date: '2020-08-20' },
  //     { name: 'COVID-19', date: '2021-06-10 (Dose 1), 2021-08-10 (Dose 2), 2022-03-05 (Reforço)' },
  //   ]
  // };

  medicalHistory: MedicalHistory | null = null;

  constructor(private authService: AuthenticationService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("inicieiiii")
    this.authService.getAnamneseById(1)//TODO: passar id do usuario
      .pipe(take(1)) 
      .subscribe({
        next: response => {
          this.medicalHistory = this.mapToMedicalHistory(response);
          console.log('MedicalHistory carregado:', this.medicalHistory);
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Erro no login:', err);
        },
      });
  }

  private mapToMedicalHistory(apiResponse: any): MedicalHistory {
    if (!apiResponse) {
      throw new Error('Resposta da API inválida');
    }

    return {
      basicInfo: {
        bloodType: apiResponse.basicInfo?.bloodType || 'Não informado',
        weight: apiResponse.basicInfo?.weight || 'Não informado',
        height: apiResponse.basicInfo?.height || 'Não informado',
        imc: apiResponse.basicInfo?.imc || 'Não calculado',
        chronicDiseases: Array.isArray(apiResponse.basicInfo?.chronicDiseases) 
          ? apiResponse.basicInfo.chronicDiseases 
          : [],
        hospitalizations: Array.isArray(apiResponse.basicInfo?.hospitalizations)
          ? apiResponse.basicInfo.hospitalizations.map((h: any) => ({
              date: h.date || '',
              reason: h.reason || ''
            }))
          : [],
        currentTreatments: Array.isArray(apiResponse.basicInfo?.currentTreatments)
          ? apiResponse.basicInfo.currentTreatments
          : []
      },
      allergies: {
        medications: Array.isArray(apiResponse.allergies?.medications)
          ? apiResponse.allergies.medications
          : [],
        food: Array.isArray(apiResponse.allergies?.food)
          ? apiResponse.allergies.food
          : [],
        others: Array.isArray(apiResponse.allergies?.others)
          ? apiResponse.allergies.others
          : [],
        noKnownAllergies: apiResponse.allergies?.noKnownAllergies ?? false
      },
      medications: Array.isArray(apiResponse.medications)
        ? apiResponse.medications.map((m: any) => ({
            name: m.name || '',
            dosage: m.dosage || '',
            frequency: m.frequency || '',
            reason: m.reason || ''
          }))
        : [],
      pastIllnessesSurgeries: Array.isArray(apiResponse.pastIllnessesSurgeries)
        ? apiResponse.pastIllnessesSurgeries.map((p: any) => ({
            type: p.type || '',
            name: p.name || '',
            date: p.date || ''
          }))
        : [],
      familyHistory: Array.isArray(apiResponse.familyHistory)
        ? apiResponse.familyHistory.map((f: any) => ({
            relationship: f.relationship || '',
            condition: f.condition || ''
          }))
        : [],
      lifestyle: {
        smoker: apiResponse.lifestyle?.smoker || 'Não informado',
        alcohol: apiResponse.lifestyle?.alcohol || 'Não informado',
        physicalActivity: apiResponse.lifestyle?.physicalActivity || 'Não informado',
        diet: apiResponse.lifestyle?.diet || 'Não informado'
      },
      vaccinations: Array.isArray(apiResponse.vaccinations)
        ? apiResponse.vaccinations.map((v: any) => ({
            name: v.name || '',
            date: v.date || ''
          }))
        : []
    };
  }
}
