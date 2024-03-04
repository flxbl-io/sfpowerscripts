
  
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
![Version](https://img.shields.io/npm/v/@flxblio/sfp.svg)
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
npm i -g @flxblio/sfp
```


#### Docker

Docker images for sfp are available at [GitHub Container Registry](https://github.com/flxbl-io/sfp/pkgs/container/sfp).

We recommend using the sfp docker image to avoid breakages in your CI/CD pipelines due to updates in sfp

#### Build Instructions
To build sfp execute the following on the terminal:
```
npm i -g lerna #Install Lerna Globally
cd <sfp directory> # Navigate to the checked out directory
pnpm i
lerna run build
```

To run unit tests

```
lerna run test
```

To debug and test plugin

```
 cd packages/sfp-cli
 npm link
```

#### Maintainers

List of Maintainers are available in the [link](https://docs.flxbl.io/about-us)


#### Where do I reach for queries?

Please create an issue in the repo for bugs or utilize GitHub Discussions for other queries. Join our [Slack Community](https://launchpass.com/flxblio) as well.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fflxblio%2Fsfp.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fflxblio%2Fsfp?ref=badge_large)
