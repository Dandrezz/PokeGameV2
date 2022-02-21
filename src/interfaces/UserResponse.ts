
export interface UserResponse {
    data: Datum[];
}

export interface Datum {
    id:    string;
    name:  string;
    score: number;
}
