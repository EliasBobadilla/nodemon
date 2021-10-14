
# Nodemon
![CodeQL](https://github.com/eliasbobadilla/nodemon/workflows/CodeQL/badge.svg) ![Tests](https://github.com/eliasbobadilla/nodemon/workflows/Tests/badge.svg)



[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

> A Pokémon API built with [Hapi](https://github.com/hapijs/hapi) on [Node.js](https://nodejs.org).

## Deploy

[Download](https://nodejs.org/en/download) and [Install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) [Node.js](https://nodejs.org).

Get the code:

```bash
git clone https://github.com/eliasbobadilla/nodemon.git && cd nodemon
```

Run:

```bash
npm install && npm start
```

## Endpoints

- Display all the Pokémon

```bash
curl http://localhost:3000/v1
```

- Paginate

```bash
curl http://localhost:3000/v1/paged/?page=1&limit=4
```

- Search Pokémon by Name

```bash
curl http://localhost:3000/v1/?name=charizard
```

- Add Pokemon

```bash
curl -X POST http://localhost:3000/v1/upsert \
   -H 'Content-Type: application/json' \
   -d '{
  "number": 1000,
  "name": "Mega Metapod Test",
  "type1": "Bug",
  "total": 1000,
  "hp": 1000,
  "attack": 1000,
  "defense": 1000,
  "spAtk": 1000,
  "spDef": 1000,
  "speed": 1000,
  "generation": 1,
  "legendary": false
}'
```

- Delete Pokemon

```bash
curl -X DELETE http://localhost:3000/v1/?id=7
```

### License

This program is licensed under the [MIT License](./LICENSE.md).