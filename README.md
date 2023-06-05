# MM CLI

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

</div>

<div align="center">

![MM CLI](https://user-images.githubusercontent.com/107426464/225413401-9cfd803a-f391-4663-b54f-0dcce6fe80d2.gif)

</div>

## Install

```shell
$ npm install -g mm-tec-cli
```

## Prefix for all commands: mm

### Example

- mm generate-component Home

<details> 
 <summary>Commands</summary>
 
| Name                                  | Description                                                                                          |
|---------------------------------------|------------------------------------------------------------------------------------------------------|
| version (v)                           | Output the version number                                                                             |
| whoami (i)                            | Show your credentials stored                                                                          |
| store-me                              | Store your git credentials (default is your local git credentials)                                   |
| git-rm-repo (rm-repo)                 | Delete the last repository cloned                                                                     |
| git-config (config)                   | Configures git credentials (If you have credentials stored, this command you set them as your git configurations) |
| git-clone (clone)                     | Clone a repository from your git (Using your credentials stored or your local git configurations)     |
| git-check (check)                     | Print your current git credentials                                                                    |
| generate-screen (gen-screen)          | Create a new file in src/screens                                                                      |
| generate-page (gen-page)              | Create a new file in src/pages                                                                        |
| generate-hook (gen-hook)              | Generate a react hook                                                                                 |
| generate-component (gen-comp)         | Create a new file in src/components                                                                  |
| generate-axios-api (gen-axios-api)    | Generate a base service to use axios                                                                  |
| default-configs                       | Store default configs. Currently just the notIndex option when creating a file                      |
| check-configs                         | Check the current status of all your saved configs                                                    |
| help (h)                              | -                                                                                                    |


</details>

## Running the project

```shell
  $ yarn
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
