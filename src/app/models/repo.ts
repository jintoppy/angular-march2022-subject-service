import { User } from './user';

export type Repo = {
    id: number;
    name: string;
    owner: User
}