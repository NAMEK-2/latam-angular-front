export class Poet {
  name: string;
  url: string;
}

export class Poem {
  title: string;
  content: string;
  url: string;
  poet: Poet;
}


export class UserDataDto {
  name: string;
  lastName: string;
  birthdate: string;
  age: number;
  daysToBirthdate: number;
  birthdateMessage: Poem;
}
