# JWT Introduction

## Package Source

> npm package -> <https://www.npmjs.com/package/jsonwebtoken> </br>
> main website -> <https://jwt.io>

## Study Case

- Monolithic app -> cek dan proses simpan data di satu tempat -> `session` -> sifatnya stateful

- Microservice app, lightweight app -> `JSON web token` -> sifatnya stateless

## What is JWT?

JWT (jsonwebtoken) merupakan sebuah `open standard` yang umum digunakan di aplikasi modern. JWT mendefinisikan suatu cara untuk mentransfer data secara compact antara tempat/sistem yang berbeda.

Data yang ditransfer ini sudah seharusnya terverifikasi dan `digitally signed`. Jadi tidak sembarang client bisa memakai service si servernya nanti.

bentuknya bagaimana?

```txt
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
```

### Bagaimana cara membuatnya?

JWT dibagi jadi 3 bagian:

- Header -> x
- Payload -> y
- Signature -> z

```txt
xxxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyy.zzzzzzzzzzzzzzzz
```

#### 1. Header

- header merupakan kepala dari data yang di transfer
- isinya? umumnya algoritma dari enkripsi yang digunakan
- `Base64 encoded`

contoh:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### 2. Payload

- isinya merupakan _claims_ (identitas si user. dan bisa ditambah data2 lain)
- `Base64 encoded`

contoh:

```json
{
  "id": 1,
  "username": "Ebel Cobra"
}
```

#### 3. Signature

- merupakan bagian verifikasi token

format ??

```txt
TIPE_ENKRIPSI(
  base64Header + "." + base64Payload, kataKunciRahasia
)
```

## Let's Demo

Buat suatu aplikasi yang mempunyai endpoint berikut:

### POST /register

### Response

- Body (200 - OK)

  ```json
  {
    "message": "user with email <your email> has been created"
  }
  ```

- Body (400 - Bad Request)

  ```json
  {
    "message": "Email cannot empty"
  }
  OR
  {
    "message": "Email already registered"
  }
  OR
  {
    "message": "Password cannot empty"
  }
  ```

### POST /login

### Response

- Body (200 - Ok)

  ```js
  {
    "access_token": <String>
  }
  ```

## References

- <https://jwt.io/introduction>
- <https://medium.com/@kennch/stateful-and-stateless-authentication-10aa3e3d4986>
