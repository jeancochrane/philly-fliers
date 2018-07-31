"""
Extra Django settings for a grout_server deployment using AWS S3 for serving
static files with django-storages.

For documentation on each of the settings, see:
https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html
"""

import os


# Required django-storages settings.
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', '')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY', '')
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_STORAGE_BUCKET_NAME', '')
AWS_S3_CUSTOM_DOMAIN = '{bucket}.s3.amazonaws.com'.format(bucket=AWS_STORAGE_BUCKET_NAME)

# Optional django-storages settings -- remove or extend these at will.
AWS_LOCATION = os.environ.get('AWS_LOCATION', '')
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
AWS_S3_FILE_OVERWRITE = False
AWS_IS_GZIPPED = True

# Static files settings.
if AWS_LOCATION:
    STATIC_URL = 'https://{host}/{location}/'.format(host=AWS_S3_CUSTOM_DOMAIN,
                                                     location=AWS_LOCATION)
else:
    STATIC_URL = 'https://{host}/'.format(host=AWS_S3_CUSTOM_DOMAIN)
