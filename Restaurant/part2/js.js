var selectedApp;
var selectedMain;
var selectedBev;

function submitOrder() {
    var ouput = '<h2> Your order has been submitted </h2>';
    document.getElementById('idOrderSummary').innerHTML = ouput;
}

function changeImage(th) {
    //img1: Spring Rolls, https://www.kinder-jugendtherapie.com/sprin-tolls 
    //img2: Fried Tofu, https://www.qaqooking.wiki/why-is-deep-frying-good-for-tofu 
    //img3: Pot Stickers, https://www.doordash.com/store/26-thai-kitchen-&-bar-atlanta-1558000/ 
    const appPicArray = ['./images/appOne.jpg', './images/appTwo.jpg', './images/appThree.jpg'],
    //img1: Vegan Pho, https://www.bonappetit.com/recipe/vegan-pho 
    //img2: Beef Tofu, https://www.aluviondecascante.com/tag/futbol-en-navarra/?new=2.155.5802046.5.28.33.instant+pot+recipes+pho 
    //img3: Bun Noodle Bowl (Shrimp), https://hellovietnamasianbistro.com/philadelphia-hello-vietnam-asian-bistro-food-menu 
    mainPicArray = ['./images/mainOne.jpg', './images/mainTwo.jpg', './images/mainThree'],
    //img1: Coffee With Milk, https://www.thespruceeats.com/make-cafe-con-leche-coffee-with-milk-3083079 
    //img2: Thai Iced Tea, https://www.yummly.com/recipe/Thai-Iced-Tea-1495744  
    //img3: Mango Boba, https://www.yummly.co.uk/recipes/tapioca-drinks 
    bevPicArray = ['./images/bevOne.jpg', './images/bevTwo.jpg', './images/bevThree.jpg']
    //Get the last index of the string
    var num = Number(th.value[th.value.length - 1] - 1)
    //Check which image needs to be changed
    if(th.id == 'idAppetizer') {
        //Check if the last index is a number
        if(isNaN(num)) return idAppPic.src = './images/selectpls.jpg' //Since its not a number we display no item has been selected
        //Since the last index is a number we display the coresponding image to their order
        idAppPic.src = appPicArray[num]
        //Change the seleted item to corespond to their order
        selectedApp = th.id.value;
    }
    else if(th.id == 'idMainCourse') {
        if(isNaN(num)) return idMainPic.src = './images/selectpls.jpg'
        idMainPic.src = mainPicArray[num]
        selectedMain = th.id.value;
    }
    else if(th.id == 'idBeverage') {
        if(isNaN(num)) return idBevPic.src = './images/selectpls.jpg'
        idBevPic.src = bevPicArray[num]
        selectedBev = th.id.value;
    }
}