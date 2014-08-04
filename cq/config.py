

try:
    # Initially import local configs
    from configs.config_local import *

    from gss_dupecheck.config import *

    # Import global configs
    from configs.config_override import *



    # app specific configs
    ES_MERGELY = "mergely"
    ES_CLUSTER = "cluster"
    ES_TOPICS = "topics"

except ImportError:

    pass