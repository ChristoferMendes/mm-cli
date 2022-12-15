# MM CLI

<div align="center"> 

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
</div>

## Install


```shell
$ npm install --global mm-tec-cli
```

## Prefix for all commands: mm
### Example
- mm generate-component Home


## Commands

- version (v) ➜ Output the version number                                          
- whoami ➜ Show your credentials stored                                       
- update-me ➜ update your credentials                                            
- store-me ➜ Store your git credentials (default is your local git credentials) 
- git-config (config) ➜ Configures git credentials                                         
- git-clone  (clone) ➜ Clone a repository from your git                                   
- git-check (check) ➜ Print your current git credentials                                 
- generate-screen (gen-screen) ➜ Create a new file in src/screens                                   
- generate-page (gen-page) ➜ Create a new file in src/pages                                     
- generate-component (gen-comp) ➜ Create a new file in src/components                                
- default-configs (configs) ➜ Store default configs (example: --not-index by default)
## License

MIT - see LICENSE


## Running the project

```shell
  $ yarn
  $ yarn gen-prisma
  $ npm link --global mm 
```

## Running tests

```shell
  $ yarn test
```

## Building the project
```shell
  $ yarn build
```