# load.py -- load sample data into an Grout Blueprint instance
import os
import time
import json
import sys
import base64

import requests

# Grout server URL
BASE_URL = 'http://grout:8000/api/'

# Number of times to retry the connection to the Grout server (helpful if
# Docker instances spin up at different times)
NUM_RETRIES = 10


def raise_for_status(response):
    '''
    Check the status of an HTTP response. If it's an error, raise the error
    and print the content of the response.
    '''
    try:
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(response.content.decode('utf-8'))
        raise(e)


if __name__ == '__main__':

    print('Loading sample data...')

    with open('sample_data.json', 'r') as sample_data_file:
        sample_data = json.load(sample_data_file)

    print(f'Checking the host at {BASE_URL}...')

    num_retries = NUM_RETRIES

    # Check if sample data already exists by looking for the first record
    # from the sample file.
    while num_retries >= 0:
        try:
            existing_recs = requests.get(BASE_URL + 'records/')
            print(f'Connected to the host at {BASE_URL}')
            break
        except requests.exceptions.ConnectionError as e:
            # Failed to establish a connection with the Grout host -- try
            # for 10 seconds, and then raise the error
            print(f'Host at {BASE_URL} is not available -- retrying ({num_retries} attempts remaining)')
            num_retries -= 1

            if num_retries == 0:
                raise(e)
            else:
                time.sleep(1)

    raise_for_status(existing_recs)
    if existing_recs.json()['count'] > 0 :
        print('Sample data already exists in the database -- skipping upload.')
        sys.exit(0)

    print('Requesting authentication token...')

    # Use development auth credentials.
    auth_info = {
        'username': 'admin',
        'password': 'admin'
    }

    token_res = requests.post(BASE_URL + 'auth/token/post/', auth_info)
    raise_for_status(token_res)
    token = 'Token   ' + token_res.json()['token']
    headers = {'Authorization': token}

    print('Uploading sample data...')

    # POST the record type
    for rt in sample_data:
        rt_res = requests.post(BASE_URL + 'recordtypes/', json=rt, headers=headers)
        raise_for_status(rt_res)
        rt_json = rt_res.json()
        print('Uploaded RecordType', rt_json['uuid'])

        # POST the record schema
        schema = rt['schema']
        schema['record_type'] = rt_json['uuid']
        schema_res = requests.post(BASE_URL + 'recordschemas/', json=schema, headers=headers)
        raise_for_status(schema_res)
        schema_json = schema_res.json()
        print('Uploaded RecordSchema', schema_json['uuid'])

        # POST the records
        for record in schema['records']:
            record['schema'] = schema_json['uuid']

            # Add images to Poster Records.
            if rt['label'] == 'Poster':
                # Convert the image file to a base64-encoded data URI string.
                filename = record['data']['driverPosterDetails']['Image']
                image_path = os.path.join('images', filename)
                with open(image_path, 'rb') as imgfile:
                    bytestring = base64.b64encode(imgfile.read()).decode('ascii')

                image = 'data:image/jpeg;base64,' + bytestring
                record['data']['driverPosterDetails']['Image'] = image

            record_res = requests.post(BASE_URL + 'records/', json=record, headers=headers)
            raise_for_status(record_res)
            record_json = record_res.json()
            print('Uploaded Record', record_json['uuid'])

    print('Done!')
