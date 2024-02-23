import { Competition } from './competition.model';
import { User } from './user.model';

export interface Ranking {
  id: {
    competitionCode: string;
    memberId: number;
  };
  competition: {
    code: string;
  };
  member: {
    num: number;
  };
  rank: number;
  score: number;
}

export interface RankingRes {
  id: {
    competitionCode: string;
    memberId: number;
  };
  competition: Competition;
  member: User;
  rank: number;
  score: number;
}

export interface PageRankings {
  content: Array<Ranking>;
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: boolean;
  empty: boolean;
}
