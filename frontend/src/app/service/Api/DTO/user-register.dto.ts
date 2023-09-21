export class UserRegisterDto {
  constructor(
    public email: string,
    public password: string,
    public first_name: string,
    public last_name: string,
  ) {}
}
