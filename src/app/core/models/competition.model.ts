import { Time } from "@angular/common";
import { User } from "./user.model";

export interface Competition {
    code: string; 
    date: Date;
    startTime: Time;
    endTime: Time;
    numberOfParticipants: number;
    location: string;
    status: string;
    members: User;
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
    numberOfElements: number,
    empty: boolean

}