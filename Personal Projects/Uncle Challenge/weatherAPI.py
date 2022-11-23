# I learned how to spell weather
import os
from dotenv import load_dotenv
import datetime as dt
import requests
from uszipcode import SearchEngine
import sys
import math

def kelvin_to_farenheit(kelvin):
  # (K - 273.15) * 9/5 + 32 is the conversion for kelvin to farenheit
  farenheit = (kelvin - 273.15) * 9/5 + 32
  return farenheit



engine = SearchEngine()

zip = input("Input zipcode: ")
try:
  zip = int(zip)
except:
  print("Please pass through a number")
  sys.exit()

zipcode = engine.by_zipcode(zip)

try:
  city=zipcode.major_city
except:
  print("Please pass through a valid zipcode")
  sys.exit()

# Now that we know its a valid zipcode start working on API requests
load_dotenv()

API_KEY = os.getenv("API_KEY")

API_URL = "https://api.openweathermap.org/data/2.5/weather?"

url = API_URL + "appid=" + API_KEY + "&q=" + city

response = requests.get(url).json()

# print(response)

# Temperatures are given in kelvin

temp_kelvin = response["main"]["temp"]
feels_kelvin = response["main"]["feels_like"]
temp_min_kelvin = response["main"]["temp_min"]
temp_max_kelvin = response["main"]["temp_max"]
temp_farinheit = math.floor(kelvin_to_farenheit(temp_kelvin))
feels_farinheit = math.floor(kelvin_to_farenheit(feels_kelvin))
temp_min_farinheit = math.floor(kelvin_to_farenheit(temp_min_kelvin))
temp_max_farinheit = math.floor(kelvin_to_farenheit(temp_max_kelvin))
generalConditions = response["weather"][0]['description'].upper()
fullTime = dt.datetime.utcfromtimestamp(response["dt"] + response["timezone"])
time = str(fullTime).split(' ')[1]

print(type(time), time)


print(f"{time} \n{generalConditions} \nTemp in {city} is {temp_farinheit}°F, it feels like {feels_farinheit}°F \n")
