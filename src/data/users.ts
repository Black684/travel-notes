export type MockUser = {
  email: string;
  password: string;
};

export const users: MockUser[] = [
  {
    email: 'admin@mail.com',
    password: '123456',
  },
  {
    email: 'user@mail.com',
    password: 'qwerty',
  },
  {
    email: 'travel@mail.com',
    password: 'travel123',
  },
];