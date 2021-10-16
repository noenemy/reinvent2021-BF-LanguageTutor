import datetime, boto3, hmac
import hashlib
from urllib.parse import quote

# Key derivation functions. See:
# http://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html#signature-v4-examples-python
def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

def getSignatureKey(key, dateStamp, regionName, serviceName):
    kDate = sign(('AWS4' + key).encode('utf-8'), dateStamp)
    kRegion = sign(kDate, regionName)
    kService = sign(kRegion, serviceName)
    kSigning = sign(kService, 'aws4_request')
    return kSigning

def add_param(params, key, value):
    return params + f'&{key}={value}'

# Using Amazon Transcribe streaming with WebSockets. See:
# https://docs.aws.amazon.com/transcribe/latest/dg/websocket.html
def get_presigned_url(region='us-west-2', language_code='en-US'):

    method = 'GET'
    service = 'transcribe'
    endpoint = f'wss://transcribestreaming.{region}.amazonaws.com:8443'
    host = f'transcribestreaming.{region}.amazonaws.com:8443'
    media_encoding = 'pcm'
    sample_rate = 44100

    # Get credentials
    credentials = boto3.Session().get_credentials()
    access_key = credentials.access_key
    secret_key = credentials.secret_key
    session_token = credentials.token

    # Create a date for headers and the credential string
    t = datetime.datetime.utcnow()
    amzdate = t.strftime('%Y%m%dT%H%M%SZ')
    datestamp = t.strftime('%Y%m%d') # Date w/o time, used in credential scope

    canonical_uri = '/stream-transcription-websocket'
    canonical_headers = 'host:' + host + '\n'
    signed_headers = 'host'
    algorithm = 'AWS4-HMAC-SHA256'

    credential_scope = datestamp + '/' + region + '/' + service + '/' + 'aws4_request'

    # canonical request
    credential = f'{access_key}/{credential_scope}'

    canonical_querystring = 'X-Amz-Algorithm=' + algorithm
    canonical_querystring = add_param(canonical_querystring, 'X-Amz-Credential', quote(credential, safe=''))
    canonical_querystring = add_param(canonical_querystring, 'X-Amz-Date', amzdate)
    canonical_querystring = add_param(canonical_querystring, 'X-Amz-Expires', '300')
    canonical_querystring = add_param(canonical_querystring, 'X-Amz-Security-Token', quote(session_token, safe=''))
    canonical_querystring = add_param(canonical_querystring, 'X-Amz-SignedHeaders', signed_headers)
    canonical_querystring = add_param(canonical_querystring, 'language-code', language_code)
    canonical_querystring = add_param(canonical_querystring, 'media-encoding', 'pcm')
    canonical_querystring = add_param(canonical_querystring, 'sample-rate', str(sample_rate))

    payload_hash = hashlib.sha256(('').encode('utf-8')).hexdigest()

    canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash

    # string_to_sign
    string_to_sign = algorithm + '\n'+ amzdate + '\n'+ credential_scope + '\n'+ hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()

    # signing_key and calculate signature
    signing_key = getSignatureKey(secret_key, datestamp, region, service)
    signature = hmac.new(signing_key, (string_to_sign).encode('utf-8'), hashlib.sha256).hexdigest()

    # finalize presigned URL
    canonical_querystring += '&X-Amz-Signature=' + signature
    request_url = endpoint + canonical_uri + '?' + canonical_querystring

    #print(request_url)

    return request_url
