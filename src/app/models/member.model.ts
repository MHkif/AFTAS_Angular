export interface Member {
    num: number; 
    name: string;
    familtyName: string;
    nationality: string;
    accessionDate:Date
    identityDocument: string;
    identityNumber: string;
}

export interface PageMembers{
    content : Array<Member>;
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