import { User } from './user';
import { Repo } from './repo';

export type SearchResult = {
    total_count: number;
    incomplete_results: boolean;
    items: User[]
}

export type RepoSearchResult = {
    total_count: number;
    incomplete_results: boolean;
    items: Repo[]
};