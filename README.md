# Ashlar server

Run a database server on top of Ashlar.

## Developing

To incorporate the Ashlar server into a project, clone it into your project
repo:

```
# Run this command in your project directory
git clone git@github.com:azavea/ashlar-server.git
```

You can also manage the dependency using [git
subtree](https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree)
if you plan to contribute your changes back upstream:

```bash
# Add the ashlar-server repo as a remote to your project directory.
git remote add -f ashlar-server git@github.com:azavea/ashlar-server.git

# Pull in ashlar-server as a subtree in your project.
git subtree add --prefix ashlar-server ashlar-server master
```

Next, create local environmental variables for your version of Ashlar server:

```bash
# Change into the ashlar-server directory.
cd ashlar-server

# You can modify this file if you'd like, but for development purposes the
# example file should be fine.
cp .env.exmple .env
```

Run the `update` script to build container images and run migrations:

```bash
# In the ashlar-server directory:
./scripts/update
```

Finally, you'll have to run Ashlar server in parallel with your app so that
they can communicate with each other. For this purpose, we recommend
[Docker Compose](https://docs.docker.com/compose/). You can find an example
of a project that integrates an Ashlar server with Docker Compose in the
[Ashlar Blueprint](https://github.com/azavea/ashlar-blueprint) repo.

## Running tests

This repo includes a small test suite for testing the authentication
module of the Ashlar server. Ashlar functionality is tested in the [Ashlar core
repo](https://github.com/azavea/ashlar).

To run the tests, use the `test` script:

```bash
# In the ashlar-server repo:
./scripts/test
```
