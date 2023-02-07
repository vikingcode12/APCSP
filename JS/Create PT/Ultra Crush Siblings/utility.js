/**
 * Function that sleeps the inputted ms, you can also toggle a log that says how long it sleeps and when it finishes
 * 
 * @param {Number} ms 
 * @param {Boolean} lg 
 * @returns 
 */
export async function sleep(ms, lg=false){
    if(ms <= 0){
        return console.error("Invalid sleep time: " + ms);
    }
    if (lg) console.log("Sleeping " + ms + "ms...") 
    
    return new Promise(resolve => setTimeout(resolve, ms)).then(() => {
        if (lg) console.log("done")
    })
}