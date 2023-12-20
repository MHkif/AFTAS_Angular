import { Time } from "@angular/common";

export interface Competition {
    code: string; 
    date: Date;
    startTime: Time;
    endTime: Time;
    numberOfParticipants: number;
    location: string;
    status: string;
    members: any;
}

export interface PageCompetition{
    content : Array<Competition>;
    pageable : any;
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: any,
    first: boolean,
    numberOfElements: boolean,
    empty: boolean

}