
  
```

        
         .----------------.  .----------------.  .----------------.
        | .--------------. || .--------------. || .--------------. |
        | |    _______   | || |  _________   | || |   ______     | |
        | |   /  ___  |  | || | |_   ___  |  | || |  |_   __ \   | |
        | |  |  (__ \_|  | || |   | |_  \_|  | || |    | |__) |  | |
        | |   '.___`-.   | || |   |  _|      | || |    |  ___/   | |
        | |  |`\____) |  | || |  _| |_       | || |   _| |_      | |
        | |  |_______.'  | || | |_____|      | || |  |_____|     | |
        | |              | || |              | || |              | |
        | '--------------' || '--------------' || '--------------' |
         '----------------'  '----------------'  '----------------'

                                                                                                               

```
![Version](https://img.shields.io/npm/v/@flxbl-io/sfp.svg)
[![GitHub stars](https://img.shields.io/github/stars/flxbl-io/sfp)](https://gitHub.com/flxbl-io/sfp/stargazers/)
[![GitHub contributors](https://img.shields.io/github/contributors/flxbl-io/sfp.svg)](https://github.com/flxbl-io/sfp/graphs/contributors/)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/flxbl-io/sfp/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![DeepScan grade](https://deepscan.io/api/teams/23310/projects/26589/branches/848646/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23310&pid=26589&bid=848646)
[![CodeFactor](https://www.codefactor.io/repository/github/flxbl-io/sfp/badge)](https://www.codefactor.io/repository/github/flxbl-io/sfp)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fflxbl-io%2Fsfp.svg?type=shield&issueType=license)](https://app.fossa.com/projects/git%2Bgithub.com%2Fflxbl-io%2Fsfp?ref=badge_shield&issueType=license) [![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/5614/badge)](https://bestpractices.coreinfrastructure.org/projects/5614)

[![Join slack](https://i.imgur.com/FZZmA3g.png)](https://launchpass.com/flxblio)

sfp is an purpose built  cli based tool specifically designed for modular Salesforce development and release management.   sfp is aimed at streamlining and automating the build, test, and deployment processes of Salesforce metadata,  code and data. It extends sf cli functionalities, focusing on artifact-driven development to enhance DevOps practices within Salesforce projects.

## Key Aspects of sfp:

- Artifact-Centric Approach: sfp packages Salesforce code and metadata into artifacts, along with deployment details, ensuring consistent deployments and simplified version management across environments.
- Best-in-Class Mono Repo Support: Offers robust support for mono repositories, facilitating streamlined development, integration, and collaboration 
- Support for Multiple Package Types: sfp accommodates various Salesforce package types with streamlined commands, enabling modular development, independent versioning, and flexible deployment strategies.
- Orchestrate Across Entire Lifecycle:  sfp provides an extensive set of functionality across the entire lifecycle of your Salesforce development.
- End-to-End Observability:  sfp is built with comprehensive metrics that are emitted on every commands providing unparalleled visibility into your ALM process.
Commands

sfp is comprised of a suite of commands to aid in your end to end development cycle for Salesforce.  Starting with the core commands, you are able to perform  basic work flows to to build and deploy artifacts (locally to start, and to a NPM artifact repository after) across environments through the command line.  As you progress in your understanding of the core commands, you can utilized more advanced commands and flags in your CI/CD platform of choice to drive a more complete release process leveraging release definitions, change logs, metrics and much more.  

sfp is constantly evolving and being driven by the passionate community that has embraced our ways of working.  We have introduced key utility commands over the years to solve pain points specific to the Salesforce Platform.  The commands have been successfully tested and used on large enterprise-scale implementations.  As we continue to grow the toolset, we hope to introduced more commands to address the future wave of challenges. 


#### Installing sfp locally

sfp can be installed on your local device using npm

```
npm i -g @flxbl-io/sfp
```


#### Docker

Docker images for sfp are available at [GitHub Container Registry](https://github.com/flxbl-io/sfp/pkgs/container/sfp).

We recommend using the sfp docker image to avoid breakages in your CI/CD pipelines due to updates in sfp

#### Build Instructions
To build sfp execute the following on the terminal:
```
cd <sfp directory> # Navigate to the checked out directory
npm i
npm run build
```

To run unit tests

```
npm run test
```

To debug and test plugin

```
 cd packages/sfp-cli
 npm link
```

...
...

## Building and Testing sfp in Isolation

To ensure consistent and reproducible builds and tests of sfp across different environments, you can leverage Docker to create an isolated container. Assuming you have a `Dockerfile` set up in the sfp package directory, follow these steps:

1. Build the Docker image:

   ```
   docker build -t sfp .
   ```

   This command will build a Docker image tagged as `sfp` using the `Dockerfile` in the current directory.

2. Run the Docker container:

   ```
   docker run -it --rm -v $(pwd):/usr/src/app sfp
   ```

   This command does the following:
   - `-it`: Runs the container in interactive mode, allowing you to see the output and interact with the container if needed.
   - `--rm`: Automatically removes the container when it exits.
   - `-v $(pwd):/usr/src/app`: Mounts your current directory (the sfp package directory) to `/usr/src/app` inside the container. This allows you to work on the sfp package files locally while running the build and test processes inside the isolated container environment.
   - `sfp`: Specifies the name of the Docker image to run.

3. Inside the container, the `CMD` instruction defined in the `Dockerfile` will be executed, running sfp's tests and build process.

4. The logs from both the test and build steps will be outputted to the console, allowing you to see the results and any potential issues.

By running the tests and build process inside a Docker container, you ensure that sfp is built and tested in a consistent and isolated environment, regardless of the host machine's setup. This helps prevent issues related to different Node.js versions or system dependencies.

If you want to run the tests and build separately or execute other npm scripts, you can override the default `CMD` instruction by specifying the command after the `docker run` command. For example:

```
docker run -it --rm -v $(pwd):/usr/src/app sfp npm test
```

This command will run only the `npm test` command inside the container.


...

To simplify building and testing the sfp package inside a Docker container, you can create aliases for the relevant commands. Open your shell configuration file (e.g., `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc`) and add the following lines:

```bash
alias sfp-build="docker build -t sfp ."
alias sfp-test="docker run -it --rm -v $(pwd):/usr/src/app sfp 'npm test'"
alias sfp="docker run -it --rm -v $(pwd):/usr/src/app sfp './bin/run'"
```

Save the file and reload the shell configuration by running the appropriate command (e.g., `source ~/.bashrc`, `source ~/.bash_profile`, or `source ~/.zshrc`).

Now, you can easily build the sfp package and run the tests inside a Docker container using the defined aliases:

1. Build the sfp package:
   ```
   sfp-build
   ```
   This command will build the Docker image tagged as `sfp-package` using the `Dockerfile` in the current directory. The `--no-cache` flag ensures that the image is always built from scratch, blowing up the previous image if it exists.

2. Run the sfp tests:
   ```
   sfp-test
   ```
   This command will execute the `npm test` command inside the sfp Docker container, running the tests in an isolated environment.

By using these aliases, you can quickly build the sfp package and run the tests within a Docker container, ensuring a clean and isolated environment every time.



...

#### Maintainers

List of Maintainers are available in the [link](https://docs.flxbl.io/about-us)

#### Where do I reach for queries?

Please create an issue in the repo for bugs or utilize GitHub Discussions for other queries. Join our [Slack Community](https://launchpass.com/flxblio) as well.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fflxblio%2Fsfp.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fflxblio%2Fsfp?ref=badge_large)
