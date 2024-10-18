export interface IModel {
    id: number;
}

export interface IClinicInformation {
    clinicName: string;
}

export interface IPatient {
    id: number;
    name: string;
    birthday: string;
    age: string
}

export interface ITablePage <T>{
    page: number;
    data: T[];
    countData: number;
    peerPage: number;
}

export interface IPatientSearch {
    name: string;
    birthdayTo: string;
    birthdayFrom: string;

}