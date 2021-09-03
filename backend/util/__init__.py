"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""
import os
import json
import boto3
import base64
from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport
from botocore.exceptions import ClientError
from aws_parameter_store import AwsParameterStore
from requests import Session
from boto3.session import Session as AWSSession
from requests_aws4auth import AWS4Auth


def check_env_vars():
    MANDATORY_ENV_VARS = ["APPSYNC_STUDENT_KEY_SECRET_NAME", "APPSYNC_STUDENT_API_URL", "APP_SETTINGS", "AWS_REGION"]

    for var in MANDATORY_ENV_VARS:
        if var not in os.environ:
            raise EnvironmentError("Failed because {} is not set.".format(var))


def get_param_path(param_path):
    """
    Retrieve all key:values in the Parameter Store.
    :param param_path:
    :return:
    """
    region = boto3.session.Session().region_name
    store = AwsParameterStore(region)
    return store.get_parameters_dict(param_path)


def get_appsync_secret(secret_name, region_name):

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    # In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    # See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    # We rethrow the exception by default.

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        if e.response['Error']['Code'] == 'DecryptionFailureException':
            # Secrets Manager can't decrypt the protected secret text using the provided KMS key.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InternalServiceErrorException':
            # An error occurred on the server side.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidParameterException':
            # You provided an invalid value for a parameter.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'InvalidRequestException':
            # You provided a parameter value that is not valid for the current state of the resource.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
        elif e.response['Error']['Code'] == 'ResourceNotFoundException':
            # We can't find the resource that you asked for.
            # Deal with the exception here, and/or rethrow at your discretion.
            raise e
    else:
        # Decrypts secret using the associated KMS CMK.
        # Depending on whether the secret is a string or binary, one of these fields will be populated.
        if 'SecretString' in get_secret_value_response:
            secret = get_secret_value_response['SecretString']
        else:
            decoded_binary_secret = base64.b64decode(get_secret_value_response['SecretBinary'])
        data = json.loads(secret)

        return data[secret_name]


def get_graphql_client(api_url, api_key):
    aws = AWSSession()
    session = Session()

    # Discover boto3 credentials, use them to manually sign appsync requests
    credentials = aws.get_credentials().get_frozen_credentials()

    # Create a `requests` compatible auth object
    session.auth = AWS4Auth(
        credentials.access_key,
        credentials.secret_key,
        aws.region_name,
        'appsync',
        session_token=credentials.token,
    )

    session.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': api_key,
        'cache-control': "no-cache",
    }

    # Select your transport with a defined url endpoint
    transport = AIOHTTPTransport(url=api_url, headers=session.headers)

    # Create a GraphQL client using the defined transport
    client = Client(transport=transport, fetch_schema_from_transport=True)

    return client
