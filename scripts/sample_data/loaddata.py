# load.py -- load sample data into an Grout Blueprint instance
import time
import json
import sys

import requests

# Grout server URL
BASE_URL = 'http://grout:8000/api/'

# Number of times to retry the connection to the Grout server (helpful if
# Docker instances spin up at different times)
NUM_RETRIES = 10


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

    existing_recs.raise_for_status()
    if existing_recs.json()['count'] > 0 :
        print('Sample data already exists in the database -- skipping upload.')
        sys.exit(0)

    print('Uploading sample data...')

    # POST the record type
    for rt in sample_data:
        rt_res = requests.post(BASE_URL + 'recordtypes/', json=rt)
        rt_res.raise_for_status()
        rt_json = rt_res.json()
        print('Uploaded RecordType', rt_json['uuid'])

        # POST the record schema
        schema = rt['schema']
        schema['record_type'] = rt_json['uuid']
        schema_res = requests.post(BASE_URL + 'recordschemas/', json=schema)
        schema_json = schema_res.json()
        print('Uploaded RecordSchema', schema_json['uuid'])

        # POST the records
        for record in schema['records']:
            record['schema'] = schema_json['uuid']
            record_res = requests.post(BASE_URL + 'records/', json=record)
            record_res.raise_for_status()
            record_json = record_res.json()
            print('Uploaded Record', record_json['uuid'])

    print('Done!')
