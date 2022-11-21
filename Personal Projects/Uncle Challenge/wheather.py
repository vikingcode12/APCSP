# importing the libraries
import requests
from bs4 import BeautifulSoup
from uszipcode import SearchEngine
import sys
from math import isnan


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


url = "https://www.google.com/search?q="+"weather"+city

html = requests.get(url).content

soup = BeautifulSoup(html, 'html.parser')

temperature = soup.find('div', attrs={'class': 'BNeawe iBp4i AP7Wnd'}).text

# this contains time and sky description
str = soup.find('div', attrs={'class': 'BNeawe tAd8D AP7Wnd'}).text

# format the data
data = str.split('\n')
time = data[0]
sky = data[1]

listdiv = soup.findAll('div', attrs={'class': 'BNeawe s3v9rd AP7Wnd'})

# FIND GENERAL CONDITIONS

# particular list with required data
strd = listdiv[30].text
tempStr = listdiv[1].text
tempArr = tempStr.split('.')
generalConditions = tempArr[0].lower()
tempHigh = tempArr[1]

# formatting the string
pos = strd.find('Wind')

print("It's", generalConditions)
print("Temperature is", temperature, " ", tempHigh)
print("Time: ", time)
print("Sky: ", sky)