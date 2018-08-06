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

## Testing

### Testing the schema editor

Test the schema editor using the `test` script:

```bash
scripts/test editor
```

#### Debugging

If you'd like to debug a failing unit test, adjust the `singleRun` config flag in
`grout-schema-editor/Gruntfile.js` to allow the test server to continue running
after test execution:

```js
// Gruntfile.js
karma: {
  unit: {
    configFile: 'test/karma.conf.js',
    singleRun: false  // Set this to `false` to allow the server to keep running
  }
}
```

Then, navigate to `http://localhost:8081` to interact with the Karma debugger.
