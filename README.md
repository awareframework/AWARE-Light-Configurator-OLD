# AWARE-Light configuration page

AWARE-Light aims to make it easy for anyone to create mobile instrumentation-based experience sampling studies.

## Getting Started

These instructions will get you a copy of the configuration page up and running on your local machine for development and testing purposes. You can access a live version of the configuration page at https://www.aware-light.org.

- Install Meteor on your local machine, as described here: https://www.meteor.com/install.
- Download a copy of the GitHub project (development branch for most up-to-date codebase).
- Run the meteor application using Terminal by calling the `meteor` command at the root of the project.
- Navigate to `localhost:3000`

## Docker

You can also run this application using Docker.

- Install Docker on your local machine, as described here: https://www.docker.com/products/docker-desktop
- Run `docker build -t aware-app -f docker/Dockerfile .` from the root of the project.
- Run `docker run -p 3000:3000 --d -name aware-app aware-app`
- Navigate to `localhost:3000`

## Questions / Discussion?

Join us on Slack! https://awareframework.slack.com/messages/

## License

[Open-source (Apache 2.0)](https://www.apache.org/licenses/LICENSE-2.0)
