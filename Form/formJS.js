img = ''

function submit() {
    //Grab all the values
    var fName = idfName.value
    var lName = idlName.value
    var year = new Date().getFullYear() - idYear.value
    var interaction = idInteraction.value
    var familyCommunication = idFamComms.checked
    var orgCommunication = idOrgComms.checked
    var research = idResearch.checked
    var news = idNews.checked
    var calling = idCallComms.checked
    var entertainment = idEntertainment.checked
    var finance = idFinance.checked
    var shopping = idShop.checked
    var checkbox = [familyCommunication, orgCommunication, research, news, calling, entertainment, finance, shopping ]
    var count = 0;
    //Change Background Color
    idBody.style.backgroundColor = '#55595f'
    var impact = "<low>Low</low>"
    for (let i = 0; i < checkbox.length; i++) {
        const element = checkbox[i];
        if(element) {
            count++
        }
    }
    //Change colors for impact of internet
    if (count > 2 && count < 6) impact = "<med>Medium</med>"
    else if (count > 5) impact = "<high>High</high>"

    //Display image based on years
    if(year < 10) idImg.src = "./DNS.jpg"
    else if(year < 20) idImg.src = "./2011.jpg"
    else if(year < 30) idImg.src = "./DIALUP.jpg"
    else if(year >= 30) idImg.src = './ARPANET.jpg'
    
    //Output survey result
    var output = `<ans>Thank You ${fName + ' ' + lName} <br> 
    You first accessed the internet in: ${year} <br>
    You have used the intenet for: ${year} years <br>
    Your response is: ${wordCount(interaction)} words long <br>
    You checked: ${count} options <br>
    The impact of the internet on your life is: ${impact} </ans>`

    results.innerHTML = output
}

//Counts words
function wordCount(str) { 
    if(str.length < 1) return 0
    return str.split(" ").length;
}

function otherText(other) {
    if(other.checked) {
        idOtherText.hidden = false
        idOtherText.value = "Please Explain."
    }
    else idOtherText.hidden = true
}