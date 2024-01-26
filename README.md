# Node.js+MySql Scheduled Job using Terraform Modules

This repo explain a Quick, Simple and Easiest way to create a Node.js + MySQL Scheduled Job in AWS using terraform modules.

This repo contains 
1. Sample Node.js application which retrieves dummy data from {JSON} Placeholder 
2. Terraform code to create AWS resources and host above application as a Scheduled Job which runs in every 2 minutes.   
   
Following Terraform modules provided by TechieInYou are used to simplify this use case.

1. [**scheduled-job**](https://registry.terraform.io/modules/techieinyou/scheduled-job/aws/latest)
2. [**lambdalayer-nodejs**](https://registry.terraform.io/modules/techieinyou/lambdalayer-nodejs/aws/latest)

# Steps to run this code

## Step 1: Prerequisites
Below are the prequisites to host this Node.js code and run as a Scheduled Job
1. AWS Account and IAM User with access to create resources
2. IAM Role with below AWS Managed policies attached (recommended).  You can use other policies which are required/appropriate for your user case. 
   1. AWSLambdaVPCAccessExecutionRole (Provides minimum permissions for a Lambda function to execute while accessing a resource within a VPC)
   2. CloudWatchEventsFullAccess (Provides full access to Amazon CloudWatch Events)
   3. CloudWatchLogsFullAccess (Provides full access to CloudWatch Logs)
3. MySQL Database connection details
4. Subnet and Security Group Ids if this Scheduled Job needs to be created inside a VPC
5. Make sure you have [Node.js](https://nodejs.org/en/download) installed  

## Step 2: Execute this code

1. Clone/Download this repo to your local folder
2. Create a file **terraform.tfvars** and assign below variables
   ```
   aws_region             = "aws region to create resources"
   aws_access_key         = "AWS IAM User access key to create resources"
   aws_secret_key         = "AWS IAM User secret key to create resources"
   
   iam_role_arn           = "AWS IAM Role ARN for Lambda"
   
   db_host                = "Endpoint of your MySQL database instance"
   db_userid              = "User Id to access MySQL database"
   db_password            = "Password to access MySQL database user"
   
   my_vpc_subnets         = [list of Subnet Ids from the VPC where the Scheduled-Job needs to be created]
   my_vpc_security_groups = [list of Security Group Ids where the Scheduled-Job needs to be created]
   ```
3. Run below commands
   ```
   terraform init
   terraform apply
   ```

# Database Connectivty
Creating Lambda in the same VPC where your MySQL database is created, will save time for the connection configuration and troubleshooting. Assign **my_vpc_subnets** and **my_vpc_security_groups** variables with those values.



