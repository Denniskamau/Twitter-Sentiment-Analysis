import json 
import tweepy
from tweepy import Stream
from tweepy import OAuthHandler 
from tweepy.streaming import StreamListener


#consumer key, consumer secret, access token, access secret.
consumer_secret='en4k3oJ8i9xfYcBxiZHrsM3js6LZDDm0Y1q8J4pfLfAN1JLYrh'
consumer_key='616IPvDx3znDMQ3gFDlUM3Gjf'
access_token_key='360352221-Ujequc8dEE9b1iiqHGIWoI62UiCkZjDSM2MWZQzC'
access_token_secret='rqdsdniTBt8qY1QsCSxiz3Kgc5hDL0oVg3508aIbo6JxF'

"""
Authorise my app to access twitter on my behalf.
"""
auth=OAuthHandler(consumer_key,consumer_secret)
auth.set_access_token(access_token_key,access_token_secret)

api= tweepy.API(auth)#THis is now my entry point to twitter.

"""
To stream all the current tweets about a given search word I will need touse the streaminf
API
"""

class MyListener(StreamListener):
    def on_data(self,data):
        try:
            with open ('data.json','w') as f:
                json.dump(data,f)
                print(data)
                return True
        except BaseException as e:
            print("Error on_data: %s" % str(e))
        return True

    def on_error(self, status):
        print(status)
        return True

twitter_stream = Stream(auth, MyListener())
twitter_stream.filter(track=[input("what do you want to search for? : ")])
