# Grout server

Run a database server on top of Grout.

## Developing

To incorporate the Grout server into a project, clone it into your project
repo:

```
# Run this command in your project directory
git clone git@github.com:azavea/grout-server.git
```

You can also manage the dependency using [git
subtree](https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree)
if you plan to contribute your changes back upstream:

```bash
# Add the grout-server repo as a remote to your project directory.
git remote add -f grout-server git@github.com:azavea/grout-server.git

# Pull in grout-server as a subtree in your project.
git subtree add --prefix grout-server grout-server master
```

Next, create local environmental variables for your version of Grout server:

```bash
# Change into the grout-server directory.
cd grout-server

# You can modify this file if you'd like, but for development purposes the
# example file should be fine.
cp .env.exmple .env
```

Run the `update` script to build container images and run migrations:

```bash
# In the grout-server directory:
./scripts/update
```

Finally, you'll have to run Grout server in parallel with your app so that
they can communicate with each other. For this purpose, we recommend
[Docker Compose](https://docs.docker.com/compose/). You can find an example
of a project that integrates an Grout server with Docker Compose in the
[Grout Blueprint](https://github.com/azavea/grout-blueprint) repo.

## Running tests

This repo includes a small test suite for testing the authentication
module of the Grout server. Grout functionality is tested in the [Grout core
repo](https://github.com/azavea/grout).

To run the tests, use the `test` script:

```bash
# In the grout-server repo:
./scripts/test
```
