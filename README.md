# AWS SNS to Trello gateway

An AWS Lambda function that publishes posts to Trello based on AWS SNS messages

## Installation

### Pre-requisites

You should have the following set up in your AWS environment:
    
    1. A basic lambda execution IAM role
    2. Credentials set up in env variables / ~/.aws/credentials

### Setup

Clone the project to your environment

    > git clone https://github.com/SC5/sns2trello.git 

Copy the config template (src/config_template.json) to src/config.json. Set your trello user key and token into the config file.

Copy the lambda environment template (example_lambdaenv.json) to lambdaenv.json. Set your AWS region and the Arn of the role used by your Lambda functions into lambdaenv.json.

Install dependencies and deploy to AWS

    > npm install
    > gulp deploy

Go to the AWS console and perform the following:
    
    1. Create an SNS topic for the slack posts
    2. Create a subscription to the SNS topic for the Lambda function deployed above (sns2trello)

## Using the Lambda function

The function for posting to Trello is invoked by sending a message to the SNS topic. The message is a JSON object that has been stringified (message has to be a string). The JSON format is:

    {
        "trelloBoardId: "--TRELLO-BOARD-ID--",
        "cardName": "My new card name",
        "cardDescription": "My new card description",
        "dueDate": "optional date"
    } 



## Release History

* 2015/10/21 - v0.9.0 - Initial version of SNS 2 Trello gateway


## License

Copyright (c) 2015 [SC5](http://sc5.io/), licensed for users and contributors under MIT license.
https://github.com/SC5/sns2trello/blob/master/LICENSE-MIT


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/SC5/sns2trello/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
