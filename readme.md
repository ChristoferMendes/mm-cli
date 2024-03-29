# MM CLI

<div align="center"> 

  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
</div>

<div align="center">

![MM CLI](https://user-images.githubusercontent.com/107426464/225413401-9cfd803a-f391-4663-b54f-0dcce6fe80d2.gif)

</div>


## Install


```shell
$ npm install --global mm-tec-cli
```

## Prefix for all commands: mm
### Example
- mm generate-component Home




<details> 
 <summary>Commands</summary>

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
</details>

## Running the project

```shell
  $ yarn
  $ yarn gen-prisma
  $ npm link
```

## Running tests

```shell
  $ yarn test
```

## Building the project
```shell
  $ yarn build
```

## License

MIT - see LICENSE
