export interface UserSearchDto {
    count: number;
    users: Array<User>
}

interface User {
    firstName: string;
    id: number;
    lastName: string;
    profileImgUrl: string | null;
}