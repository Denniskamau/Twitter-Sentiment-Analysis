import json
import pandas as pd 
import matplotlib.pyplot as plt

data=[]
with open('data.json','r') as f:
    for line in f:
        file=json.loads(line)
        data.append(file)
# df =pd.read_json('data.json')
df = pd.DataFrame(data, columns=["text"])
print(df.head(2))
