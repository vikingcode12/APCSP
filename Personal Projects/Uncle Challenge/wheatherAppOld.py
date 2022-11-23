# Imports
import tkinter as tk;

# Root of app
root = tk.Tk()

# Set app dimensions
root.geometry(f'{640}x{480}')

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

input = tk.Entry(root, width=50, justify='center')
input.bind("<Button-1>", placeHolder)
input.insert(0, "ZIPCODE")
input.pack()

# Actual function that fetches the weather
def fetchWeather():
    zip = input.get()
    city = ''
    import requests
    from bs4 import BeautifulSoup
    from uszipcode import SearchEngine
    engine = SearchEngine()
    output = ""
    
    try:
        zip = int(zip)
    except:
        output = "Please input a number"
        outputLabel.config(text=output)
        return
    zipcode = engine.by_zipcode(zip)

    try:
        city=zipcode.major_city
    except:
        output = "Please input a valid zipcode"
        outputLabel.config(text=output)
        return

    url = "https://www.google.com/search?q="+"weather"+city

    html = requests.get(url).content

    soup = BeautifulSoup(html, 'html.parser')

    temperature = soup.find('div', attrs={'class': 'BNeawe iBp4i AP7Wnd'}).text

    # this contains time and sky description
    str = soup.find('div', attrs={'class': 'BNeawe tAd8D AP7Wnd'}).text

    # format the data
    data = str.split('\n')
    time = data[0]
    generalConditions = data[1]

    listdiv = soup.findAll('div', attrs={'class': 'BNeawe s3v9rd AP7Wnd'})


    # particular list with required data
    strd = listdiv[5].text
    tempStr = listdiv[1].text
    output += "Time: " + time + "\n"
    output =  generalConditions + "\n"
    output += "Temperature is " + temperature + "\n"
    outputLabel.config(text=output)

label3 = tk.Label(root, text=" ")
label3.pack()


button = tk.Button(root, text="Fetch Weather", command=fetchWeather)
button.pack()

label4 = tk.Label(root, text=" ")
label4.pack()

outputLabel = tk.Label(root, text=" ")
outputLabel.pack()

root.winfo_toplevel().title("Weather Fetcher")
root.mainloop()