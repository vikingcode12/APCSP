function submitOrder() {
    var ouput = '<h2> Your order has been submitted </h2>';
    document.getElementById('idOrderSummary').innerHTML = ouput;
}

function changeImage(th) {
    const appPicArray = ['./images/appOne.jpg', './images/appTwo.jpg', './images/appThree.jpg'],
    mainPicArray = ['./images/mainOne.jpg', './images/mainTwo.jpg', './images/mainThree'],
    bevPicArray = ['./images/bevOne.jpg', './images/bevTwo.jpg', './images/bevThree.jpg']
    var num = Number(th.value[th.value.length - 1] - 1)
    console.log(num)
    if(th.id == 'idAppetizer') {
        if(isNaN(num)) return idAppPic.src = './images/selectpls.jpg'
        idAppPic.src = appPicArray[num]
    }
    else if(th.id == 'idMainCourse') {
        if(isNaN(num)) return idAppPic.src = './images/selectpls.jpg'
        idMainPic.src = mainPicArray[num]
    }
    else if(th.id == 'idBeverage') {
        if(isNaN(num)) return idAppPic.src = './images/selectpls.jpg'
        idBevPic.src = bevPicArray[num]
    }
}