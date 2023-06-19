# grammar-gpt README

## Features

 - Select text and `Crtl+g f` to correct grammar issues and typos

![fix grammar errors](images/grammar.gif)

## TODO

- [ ] Use a small enough language model that can be run locally, so that this extension is completely free.
- [ ] Rephrase selected text
- [ ] Next sentence suggestion

## Requirements

No requirements so far.

## Extension Settings

* `grammar-gpt.OpenAI.APIKey`: Your api key to OpenAI API

## Known Issues

 - [ ]: Doesn't show user friendly message when api key is not valid
 - [ ]: Doesn't show user friendly message when request to OpenAI fails (429, 401, etc)

## Release Notes

### 0.0.1

Initial release

### 0.0.2

 - Fixed the bug that the extension couldn't read the API key from the configuration.

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
