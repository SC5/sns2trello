# AWS SNS to Slack gateway

An AWS Lambda function that publishes posts to Slack based on AWS SNS messages

## Installation

### Pre-requisites

You should have the following set up in your AWS environment:
    
    1. A basic lambda execution IAM role
    2. Credentials set up in env variables / ~/.aws/credentials

### Setup

Clone the project to your environment

    > git clone https://github.com/SC5/sns2slack.git 

Copy the config template (src/config_template.json) to src/config.json. Set the slack channel and tokens to match your environment.

Copy the lambda environment template (example_lambdaenv.json) to lambdaenv.json. Set your AWS region and the Arn of the role used by your Lambda functions into lambdaenv.json.

Install dependencies and deploy to AWS

    > npm install
    > gulp deploy

Go to the AWS console and perform the following:
    
    1. Create an SNS topic for the slack posts
    2. Create a subscription to the SNS topic for the Lambda function deployed above (sns2slack)

## Using the Lambda function

The function for posting to Slack is invoked by sending a message to the SNS topic. The message is a JSON object that has been stringified (message has to be a string). The JSON format is:

    {
        "channel": "-SLACK CHANNEL NAME-",
        "message": "-YOUR MESSAGE (TEXT)-",
        "iconEmoji": "-EMOJI TO USE IF ANY-",
        "senderName": "-YOUR-NAME-HERE-",
        "attachments": [
            {
                "title" : "-FIRST-ATTACHMENT-TITLE-",
                "text" : "-FIRST-ATTACHMENT-TEXT-"
            },
            ...
        ]
    } 



## Release History

* 2015/10/10 - v0.9.0 - Initial version of SNS 2 Slack gateway


## License

Copyright (c) 2015 [SC5](http://sc5.io/), licensed for users and contributors under MIT license.
https://github.com/sc5/grunt-bobrsass-boilerplate/blob/master/LICENSE-MIT


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/SC5/sc5-aws-lambda-boilerplate/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
