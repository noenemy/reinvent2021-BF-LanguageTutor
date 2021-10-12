"""
    #TITLE
    ~~~~~~~~~~~~~~~~~~~~~~~

    :created date: 8/23/21
    :description:
    :copyright: © 2021 written by sungshik (liks79@gmail.com)
    :license: BSD 3-Clause License, see LICENSE for more details.
"""

import boto3
import base64
import config
import io
from flask import Blueprint, make_response, request, jsonify
from flask import current_app as app
from util import get_appsync_secret, get_graphql_client
from werkzeug.exceptions import BadRequest
from contextlib import closing
from PIL import Image

demo = Blueprint('demo', __name__)

# api_url = config.APPSYNC_STUDENT_API_URL
# api_key = get_appsync_secret(config.APPSYNC_STUDENT_KEY_SECRET_NAME, config.AWS_REGION)
# client = get_graphql_client(api_url, api_key)


@demo.route('/rekognition', methods=['POST'], strict_slashes=False)
def rekognition():
    try:
        session = boto3.session.Session()
        rekog = session.client('rekognition')

        base64Image = request.form['image']
        base64Image = base64.b64decode(base64Image.split(',')[1])
        receivedImage = Image.open(io.BytesIO(base64Image))

        byteArrImage = io.BytesIO()
        receivedImage.save(byteArrImage, format='PNG')
        byteArrImage = byteArrImage.getvalue()

        # app.logger.debug(req_data)
        # fileContent = base64.b64decode(req_data.replace('data:image/png;base64,', ''))
        #fileContent = base64.b64decode(req_data)
        response = rekog.detect_labels(
            Image={
                'Bytes': byteArrImage,
            }
        )
        app.logger.info('success!')
        res = make_response(response, 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)


@demo.route('/textract', methods=['POST'], strict_slashes=False)
def textract():
    try:
        session = boto3.session.Session()
        textract = session.client('textract')

        base64Image = request.form['image']
        base64Image = base64.b64decode(base64Image.split(',')[1])
        receivedImage = Image.open(io.BytesIO(base64Image))

        byteArrImage = io.BytesIO()
        receivedImage.save(byteArrImage, format='PNG')
        byteArrImage = byteArrImage.getvalue()

        # app.logger.debug(req_data)
        # fileContent = base64.b64decode(req_data.replace('data:image/png;base64,', ''))
        #fileContent = base64.b64decode(req_data)
        response = textract.detect_document_text(
            Document={
                'Bytes': byteArrImage,
            }
        )
        app.logger.info('success!')
        res = make_response(response, 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)


@demo.route('/polly/languages', methods=['GET'], strict_slashes=False)
def get_polly_language():
    try:
        session = boto3.session.Session()
        polly = session.client('polly')

        response = polly.describe_voices()
        languageList = []

        for voice in response['Voices']:
            # add only none-duplicate language codes
            if next((item for item in languageList if item['languageCode'] == voice['LanguageCode']), False) == False:
                dic = {
                    'languageCode': voice['LanguageCode'],
                    'languageName': voice['LanguageName']
                }
                languageList.append(dic)

        #print(languageList)

        app.logger.info('success!')
        res = make_response(jsonify(languageList), 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)


@demo.route('/polly/voices', methods=['GET'], strict_slashes=False)
def get_polly_voices():
    try:
        session = boto3.session.Session()
        polly = session.client('polly')

        languageCode = request.args.get('languageCode')

        response = polly.describe_voices(LanguageCode=languageCode)
        voiceList = []

        for voice in response['Voices']:
            if voice['LanguageCode'] is not None:
                dic = {
                    'voiceName': voice['Name'],
                    'gender': voice['Gender']
                }
                voiceList.append(dic)

        #print(voiceList)

        app.logger.info('success!')
        res = make_response(jsonify(voiceList), 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)


@demo.route('/polly', methods=['GET'], strict_slashes=False)
def polly():
    try:
        session = boto3.session.Session()
        polly = session.client('polly')
        response = polly.synthesize_speech(VoiceId='Joanna',
                        OutputFormat='mp3', 
                        Text = 'This is a sample text to be synthesized.')

        if "AudioStream" in response:
            with closing(response["AudioStream"]) as stream:
                
                bucket_name = "reinvent-language-tutor"
                key = "pollydemo"

                # upload audio stream to s3 bucket
                s3 = session.client('s3')
                output = io.BytesIO()
                output.write(response['AudioStream'].read())
                s3.put_object(Body=output.getvalue(), Bucket=bucket_name, Key=key)
                output.close()

                # get signed url for the uploaded audio file
                signedUrl = s3.generate_presigned_url(
                    ClientMethod='get_object',
                    Params={
                        'Bucket': bucket_name,
                        'Key': key
                    }
                )

        app.logger.info('success!')
        res = make_response(jsonify({'mediaUrl':signedUrl}), 200)
        return res

    except Exception as e:
        app.logger.error(e)
        raise BadRequest(e)
