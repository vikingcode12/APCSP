var selectedApp;
var selectedMain;
var selectedBev;
var selectedAppPrice = 0;
var selectedMainPrice = 0;
var selectedBevPrice = 0;
var tip = 0;

//On reload the selected option doesn't change sometimes so the image must match
window.onload = e => {
    changeImage(idAppetizer)
    changeImage(idMainCourse)
    changeImage(idBeverage)
}

function submitOrder() {
    //If no items were ordered don't do anything
    if(calcSubTotal() == "No items ordered") return idOrderSummary.innerHTML = "<h1>No items ordered.";
    else if(!idName.value) return idOrderSummary.innerHTML = "Please enter a name.";
    else if(!idPhone.value) return idOrderSummary.innerHTML = "Please enter a phone number.";
    var output = '<l> Submitted </l>';
    output += `<br> Name: ${idName.value}`;
    output += `<br> Phone Number: ${idPhone.value}`;
    output += `<br> Appetizer: ${formatUSD(selectedAppPrice)}`
    output += `<br> Main Dish: ${formatUSD(selectedMainPrice)}`
    output += `<br> Beverage: ${formatUSD(selectedBevPrice)}`
    output += `<br> Tip: ${formatUSD(tip)}`
    output += `<br> Sub Total: ${calcSubTotal()}`
    output += `<br> Total Amount: ${calcTotal()}`
    if(idCheck.checked) output += "<h2>You will recieve a text notification when your order is ready. </h2>"
    else output += "<h2> You will not receive text notifications. <br> Orders are typically finished in 30 minutes."
    output += "<br> Please pay in-store.</h2>"
    


    
    document.getElementById('idOrderSummary').innerHTML = output;
}

function changeImage(th) {
    //img1: Spring Rolls, https://www.kinder-jugendtherapie.com/sprin-tolls 
    //img2: Fried Tofu, https://www.qaqooking.wiki/why-is-deep-frying-good-for-tofu 
    //img3: Pot Stickers, https://www.doordash.com/store/26-thai-kitchen-&-bar-atlanta-1558000/ 
    const appPicArray = ['./images/appOne.jpg', './images/appTwo.jpg', './images/appThree.jpg'],
    //img1: Vegan Pho, https://www.bonappetit.com/recipe/vegan-pho 
    //img2: Beef Tofu, https://www.aluviondecascante.com/tag/futbol-en-navarra/?new=2.155.5802046.5.28.33.instant+pot+recipes+pho 
    //img3: Bun Noodle Bowl (Shrimp), https://hellovietnamasianbistro.com/philadelphia-hello-vietnam-asian-bistro-food-menu 
    mainPicArray = ['./images/mainOne.jpg', './images/mainTwo.jpg', './images/mainThree.jpg'],
    //img1: Coffee With Milk, https://www.thespruceeats.com/make-cafe-con-leche-coffee-with-milk-3083079 
    //img2: Thai Iced Tea, https://www.yummly.com/recipe/Thai-Iced-Tea-1495744  
    //img3: Mango Boba, https://www.yummly.co.uk/recipes/tapioca-drinks 
    bevPicArray = ['./images/bevOne.jpg', './images/bevTwo.jpg', './images/bevThree.jpg']
    //Get the last index of the string
    var num = Number(th.value[th.value.length - 1] - 1)
    //Check which image needs to be changed
    if(th.id == 'idAppetizer') {
        //Change the seleted item to corespond to their order
        selectedApp = th.options[th.selectedIndex].innerHTML;
        //Grab the price of the selected item
        selectedAppPrice = parseFloat(th.options[th.selectedIndex].attributes.price.value)
        //Check if the last index is a number
        //Image is custom made by me no need for credit
        if(isNaN(num)) return idAppPic.src = './images/selectpls.jpg' //Since its not a number we display no item has been selected
        //Since the last index is a number we display the coresponding image to their order
        idAppPic.src = appPicArray[num]
    }
    else if(th.id == 'idMainCourse') {
        selectedMain = th.options[th.selectedIndex].innerHTML;
        selectedMainPrice = parseFloat(th.options[th.selectedIndex].attributes.price.value)
        if(isNaN(num)) return idMainPic.src = './images/selectpls.jpg'
        idMainPic.src = mainPicArray[num]
    }
    else if(th.id == 'idBeverage') {
        selectedBev = th.options[th.selectedIndex].innerHTML;
        selectedBevPrice = parseFloat(th.options[th.selectedIndex].attributes.price.value)
        if(isNaN(num)) return idBevPic.src = './images/selectpls.jpg'
        idBevPic.src = bevPicArray[num]
    }
}

function calcSubTotal() {
    //If nothing was bought then return that
    if(selectedAppPrice + selectedMainPrice + selectedBevPrice == 0) return "No items ordered"
    let subtnotip = selectedAppPrice + selectedMainPrice + selectedBevPrice
    //Calculate the tip
    if(idTip.value) tip = idTip.value/100 * subtnotip;
    //If no tip given then tip is 0
    else tip = 0;
    //Display subtotal before tax
    return formatUSD((subtnotip + tip).toFixed(2));
}

function calcTotal() {
    const taxRate = .1025;
    //Get the subtotal
    var subt = selectedAppPrice + selectedMainPrice + selectedBevPrice;
    var tax = Number(subt * taxRate).toFixed(2)
    //Return Total
    return formatUSD((Number(subt) + Number(tax) + Number(tip)).toFixed(2))
}

function formatUSD(num) {
    //Function to format into USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    return formatter.format(num)
}