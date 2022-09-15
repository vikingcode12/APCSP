

function submit() {
    var fName = idfName.value
    var lName = idlName.value
    var year = idYear.value
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
    var impact = "Low"
    for (let i = 0; i < checkbox.length; i++) {
        const element = checkbox[i];
        if(element) {
            count++
        }
    }

    if (count > 2 && count < 6) impact = "Medium"
    if (count > 5) impact = "High"
    
    var output = `<ans>Thank You ${fName + ' ' + lName} <br> 
    You first accessed the internet in: ${year} <br>
    You have used the intenet for: ${new Date().getFullYear() - year} years <br>
    Your response is: ${wordCount(interaction)} words long <br>
    You checked: ${count} options <br>
    The impact of the internet on your life is: ${impact} </ans>`

    results.innerHTML = output
}

function wordCount(str) { 
    return str.split(" ").length;
}

function otherText(other) {
    if(other.checked) idOtherText.hidden = false
    else idOtherText.hidden = true
}