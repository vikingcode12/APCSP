var selectedApp;
var selectedMain;
var selectedBev;
var selectedAppPrice = 0;
var selectedMainPrice = 0;
var selectedBevPrice = 0;

function submitOrder() {
    //If no items were ordered don't do anything
    if(calcSubTotal() == "No items ordered") return idOrderSummary.innerHTML = "No items ordered";
    var output = '<h2> Your order has been submitted </h2>';
    output += `Name: ${idName.value}`;
    output += `<br> Phone Number: ${idPhone.value}`;
    if(idCheck.checked) output += "<br> You will recieve a text notification when your order is ready."
    else output += "<br> You will not receive text notifications. <br> Orders are typically finished in 30 minutes."
    output += `<br> Sub Total: ${calcSubTotal()}`
    output += `<br> Total Amount: ${calcTotal()}`


    
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
    //Format into USD
    let dollarUSLocale = Intl.NumberFormat('en-US');
    //If nothing was bought then return that
    if(selectedAppPrice + selectedMainPrice + selectedBevPrice == 0) return "No items ordered"
    let subtnotip = selectedAppPrice + selectedMainPrice + selectedBevPrice
    //Calculate the tip
    if(idTip.value) var tip = idTip.value/100 * subtnotip;
    console.log(tip);
    //Display subtotal before tax
    return '$' + dollarUSLocale.format((subtnotip + tip).toFixed(2));
}

function calcTotal() {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    const taxRate = .1025;
    //Get the subtotal
    var subt = selectedAppPrice + selectedMainPrice + selectedBevPrice;
    var tax = Number(subt * taxRate).toFixed(2)
    if(idTip.value) var tip = idTip.value/100 * subt;
    return "$" + dollarUSLocale.format(Number(subt) + Number(tax) + Number(tip)
}