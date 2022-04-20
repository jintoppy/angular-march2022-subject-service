import { User } from './user';

export type SearchResult = {
    total_count: number;
    incomplete_results: boolean;
    items: User[]
}