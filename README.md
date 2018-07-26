# Philly Fliers

Archiving queer life in Philadelphia through posters and fliers.

(No affiliation to the sports team.)

## Developing

To get the services up and running, first move the example `.env` file over
to the Grout Server repo:

```
cp grout.env.example grout-server/.env
```

Next, build the containers:

```
./scripts/update
```

Finally, run the services with the `server` script:

```
./scripts/server
```
