export class UsersModel {
  name?: string;
  full_name?: string;
  avatar_url?: string;
  language?: string;
  watchers?: string;
  forks?: string;
  open_issues_count?: number;
  stargazers_count?: number;

  constructor(dto?: any) {
    this.name = dto.name;
    this.full_name = dto.full_name;
    this.avatar_url = dto.avatar_url;
    this.language = dto.language;
    this.watchers = dto.watchers;
    this.forks = dto.forks;
    this.open_issues_count = dto.open_issues_count;
    this.stargazers_count = dto.stargazers_count;
  }
}
