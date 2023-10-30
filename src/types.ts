export interface User {
  username: string;
  name: string;
  whatsapp: string | null;
  instagram: string | null;
  line: string | null;
}

export interface BaseResponse<T> {
  message: string;
  data: T;
}

export interface Match {
  firstUsername: string;
  secondUsername: string;
  mutual: boolean;
}

export interface MatchData {
  matches: Match[];
  users: Exclude<User, "password">[];
}
