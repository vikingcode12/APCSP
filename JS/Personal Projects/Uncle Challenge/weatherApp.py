# Create a program with a GUI that can fetch weather from zipcode using google api (NGL I would've much rather used Electron)

# Imports
import tkinter as tk;
from PIL import Image, ImageTk

# Root of app
root = tk.Tk()

# Set app dimensions
root.geometry(f'{640}x{480}')

# Set the icon
ico = Image.open('./images.png')
photo = ImageTk.PhotoImage(ico)
root.wm_iconphoto(False, photo)

# Create a label widget and spacer
label1 = tk.Label(root, text="Welcome To Weather Fetcher")
label2 = tk.Label(root, text=" ")
label1.pack()
label2.pack()

# Emulate placeholder for input[text] in HTML
def placeHolder(e):
    zip = input.get()
    if zip == "ZIPCODE":
        input.delete(0, len(zip))

# Set the input to also have a button that runs the placeholder function
input = tk.Entry(root, width=50, justify='center')
input.bind("<Button-1>", placeHolder)
input.insert(0, "ZIPCODE")
input.pack()

# Actual function that fetches the weather
def fetchWeather():
    zip = input.get()
    city = ''
    output = ""
    # Imports
    import os
    from dotenv import load_dotenv
    import datetime as dt
    import requests
    from uszipcode import SearchEngine
    import math
    engine = SearchEngine()

    def kelvin_to_farenheit(kelvin):
        # (K - 273.15) * 9/5 + 32 is the conversion for kelvin to farenheit
        farenheit = (kelvin - 273.15) * 9/5 + 32
        return farenheit
    
    # Check is zipcode is a number
    try:
        zip = int(zip)
    except:
        output = "Please input a number"
        outputLabel.config(text=output)
        return
    zipcode = engine.by_zipcode(zip)

    # Check if zipcode is valid
    try:
        city=zipcode.major_city
    except:
        output = "Please input a valid zipcode"
        outputLabel.config(text=output)
        return

    # Now that we know its a valid zipcode start working on API requests
    load_dotenv()

    API_KEY = os.getenv("API_KEY")

    API_URL = "https://api.openweathermap.org/data/2.5/weather?"

    # API URL + API KEY + Queried City
    url = API_URL + "appid=" + API_KEY + "&q=" + city

    # Parse response as JSON
    response = requests.get(url).json()

    # Grab data
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
    # I believe we are given this in m/s so use the conversion factor 2.237 to reach mi/hr
    windSpeed = response["wind"]["speed"]*2.237

    # Parse Data
    output = f"Local Time: {time} \n{generalConditions} \nTemp in {city}: {temp_farinheit}°F \nFeels like: {feels_farinheit}°F \nHigh: {temp_max_farinheit}°F \nLow: {temp_min_farinheit}°F \nWind Speed: {windSpeed}Mi/H"
    outputLabel.config(text=output)

# Spacer
label3 = tk.Label(root, text=" ")
label3.pack()

# Fetch Weather Button
button = tk.Button(root, text="Fetch Weather", command=fetchWeather)
button.pack()

# Spacer
label4 = tk.Label(root, text=" ")
label4.pack()

# Output
outputLabel = tk.Label(root, text=" ")
outputLabel.pack()

# Set Window Title
root.winfo_toplevel().title("Weather Fetcher")

root.mainloop()