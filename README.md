# NOC List

Create a series of tasks using clean arquitecture with typescript

## dev

1. Create an **.env** file.
2. Configure environment variables like:

```Typescript
    PORT=
    MAILER_EMAIL=
    MAILER_PASSWORD=
    MAILER_HOST=
    MAILER_PORT=
    MAILER_SECURE=
```

3. Run `npm install`

4. To acced the **Adminer** container you can do:

```
localhost:8080
```

The "**server**" field should be **`postgres-db`** (the name of the service container spacified in **docker-compose.yaml**). Every other info comes from **.env**

5. Run

```bash
npm run dev
```
