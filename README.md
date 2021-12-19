# Becomes - NodeJS backend test

## Task 1

Write a function which takes any positive integer **n** as an input and does not return any value. Function should loop **n** times and print `Foo` every third time and `Bar` every fifth time, while in all other cases it just prints a current number.

```ts
function fooBar(input: number): void {
  /* Logic */
}

fooBar(16);
/**
 * Output in console:
 *
 * 1
 * 2
 * Foo
 * 4
 * Bar
 * Foo
 * 7
 * 8
 * Foo
 * Bar
 * 11
 * Foo
 * 13
 * 14
 * FooBar
 * 16
 */
```

## Task 2

Write a function which takes a string array as an input and returns an array objects with the information about how many times, which string is repeated in an input array.

```ts
function sameValuesCounter(
  input: string[],
): Array<{
  value: string;
  count: number;
}> {
  /* Logic */
}
console.log(sameValuesCounter(['bar', 'foo', 'bar', 'foobar', 'bar', 'foo']));
/**
 * Output in console:
 *
 * [ { value: 'bar', count: 3 },
 *  { value: 'foo', count: 2 },
 *  { value: 'foobar', count: 1 } ]
 */
```

## Task 3

Write a function which takes an absolute path (to a directory in a file system) and returns a list of aggregated objects where each object contains an information about a single file in that directory and if file is a directory, it will contain information about its children.

```ts
import * as path from 'path';

interface File {
  name: string;
  type: 'file' | 'dir';
  path: string;
  children?: File[];
}

async function listDir(location: string): Promise<File[]> {
  /* Logic */
}
listDir(path.join(__dirname, 'target'))
  .then((result) => {
    console.log(JSON.stringify(result, null, '  '));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Task 4

Create a REST API for music library application. Application has 2 type of users. First type is the Client user, it can list songs and like or dislike them. Second type is the Admin user and it does not have any restrictions.

**Endpoints**

- `GET: /song/all` - Get list of all songs in the library.
- `GET: /song/:id` - Get a specific song in the library.
- `PUT: /song/:id/react` - React to a song by linking or disliking it. Have in mind that 1 User should be able to react to a song only once.
- `POST: /song` - Add new song to the library. Likes/dislikes for a song are always 0 when a new song is created.
- `PUT: /song` - Update an existing song information in the library. Have in ming that likes/dislikes cannot be changed using this endpoint.
- `DELETE: /song/:id` - Remove song from the library.

**Directions**

- Task should be completed using [ExpressJS](https://expressjs.com/), [Typescript](https://www.typescriptlang.org/) and [MongoDB](https://www.mongodb.com/) as a database.
- It is not required for the API to be secure. This means that users do not need to login to access the API resources (everything is public), but it will be highly appreciated if good security mechanism is provided.
