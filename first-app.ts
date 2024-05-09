//objects

type User = { name: string; age: number; isAdmin: boolean; id: string };

let user: User;

user = {
  name: 'John',
  age: 52,
  isAdmin: true,
  id: 'abc',
};

//Arrays

// let hobbies:string[] | number[];
let hobbies: Array<string | number>;

hobbies = ['Sports', 'cooking', 'Reading'];

hobbies = [1, 2, 3];

//functions

function add(a: number, b: number): number {
  const result = a + b;
  console.log(result);
  return result;
}

type Addfn = (a: number, b: number) => number;

function calculate(a: number, b: number, calcFn: Addfn) {
  calcFn(a, b);
}

calculate(10, 5, add);

// interface

interface Credentials {
  password: string;
  email: string;
}

let creds: Credentials;

creds = {
  password: 'abc',
  email: 'user@mail.com',
};

// interfaces vs custom types

class AuthCredentials implements Credentials {
  password: 'abc';
  email: 'user@mail.com';
}

function login(credentials: Credentials) {}

login(new AuthCredentials());

//merging types

type Admin = {
  permission: string[];
};

type AppUser = {
  userName: string;
};

type AppAdmin = Admin & AppUser;

let admin: AppAdmin;

admin = {
  permission: ['a'],
  userName: 'as',
};

//literal types

let role: 'admin' | 'user' | 'editor';

// adding type guards

type Role = 'admin' | 'user' | 'editor';

function performAction(action: string | number, role: Role) {
  if (role === 'admin') {
    // action
  }
}

//generics

let roles: Array<Role>;

type DataStorage<T> = {
  storage: T[];
  add: (data: T) => void;
};

const textStorage: DataStorage<string> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

const userStorage: DataStorage<User> = {
  storage: [],
  add(user) {
    this.storage.push(user);
  },
};

function merge<T, U>(a: T, b: U) {
  return {
    ...a,
    ...b,
  };
}

const userMerge = merge<{ name: string }, { age: number }>({ name: 'John' }, { age: 31 });

console.log(userMerge);
