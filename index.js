const fs =  require('fs');
const inquirer = require('inquirer');

let licenseEmblemPath;
let licenseInfo;

// Uses inquirer to get information from user about their README
inquirer.prompt ([
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'githubUsername'
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'emailAddress'
    },
    {
        type: 'input',
        message: 'What is your project name?',
        name: 'projectTitle'
    },
    {
        type: 'input',
        message: 'Please enter a short description for your project:',
        name: 'projectDescription'
    },
    {
        type: 'input',
        message: 'What command should be run to install dependencies?',
        name: 'installInstructions'
    },
    {
        type: 'input',
        message: 'What does the user need to know about using the repository?',
        name: 'usageInformation'
    },
    {
        type: 'input',
        message: 'What are the contribution guidelines of your project?',
        name: 'contributionGuidelines'
    },
    {
        type: 'input',
        message: 'What command should be run to run tests?',
        name: 'testInstructions'
    },
    {
        type: 'list',
        message: 'What kind of license should your project have? ',
        choices:  [
            'MIT','Apache', 'ISC'
        ],
        name: 'license'
    }
]).then((data) => {
    pickLicenseInfo(data.license);
    const finalREADMEText = READMEText(data, licenseEmblemPath, licenseInfo);
    fs.appendFile('CreatedREADME.md', finalREADMEText, (err) =>
    err ? console.error(err) : console.log('File Created/Updated')
    );
});

// Takes in user input data and creates the text for the README
const READMEText = (data, licenseEmblemPath, licenseInfo) => 
`
# ${data.projectTitle}
${licenseEmblemPath}

Table of Contents
- [Description](#description)
- [Installation](#installation-instructions)
- [Usage](#usage-information)
- [Contributing](#contribution-guidelines)
- [Tests](#test-instructions)
- [License](#license)
- [Questions](#questions)

## Description
${data.projectDescription}

## Installation Instructions
${data.installInstructions}

## Usage Information
${data.usageInformation}

## Contribution Guidelines
${data.contributionGuidelines}

## Test Instructions
${data.testInstructions}

## License
${licenseInfo}

## Questions
If you have any questions feel free to contact me at:  
GitHub: https://github.com/${data.githubUsername}  
Email: ${data.emailAddress}
`

// Takes in the user's license selection and creates variables with needed information for the README
const  pickLicenseInfo = userPickedLicense => {
    switch(userPickedLicense){
        case 'MIT':
            licenseEmblemPath = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
            licenseInfo = `The MIT License (MIT)

            Copyright (c)
            
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            
            Source: http://opensource.org/licenses/MIT`;
            break;
        case 'Apache':
            licenseEmblemPath = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
            licenseInfo = `Copyright 2020 - 2021

            Licensed under the Apache License, Version 2.0 (the "License");
            you may not use this file except in compliance with the License.
            You may obtain a copy of the License at
            
               http://www.apache.org/licenses/LICENSE-2.0
            
            Unless required by applicable law or agreed to in writing, software
            distributed under the License is distributed on an "AS IS" BASIS,
            WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            See the License for the specific language governing permissions and
            limitations under the License.`;
            break;
        case 'ISC':
            licenseEmblemPath = `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
            licenseInfo = `Copyright (c) 2021

            Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
            
            THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
            
            Source: http://opensource.org/licenses/ISC`;
            break;
            default:
                console.log('Enter a valid license.');
    }
}