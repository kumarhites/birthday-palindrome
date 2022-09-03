import { useState } from 'react'
import { HiCalendar } from "react-icons/hi";
import { TiWarning } from "react-icons/ti";
import './App.css'
import loadingGif from './assets/cat-what.gif'

function App() {
  const [output, setOutput] = useState("");
  const [date, setDate] = useState("")
  let newOutput = "";
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const inputHandler =(e) => {
      if(date){
        setOutput(<img src={loadingGif} className="gif"></img>);
        setTimeout(() => {
          checkPalindrome()
        }, 3000)
      }
      else{
        setOutput(<p className='error'><TiWarning />Please enter the date!</p>)
      }
  }
  function checkPalindrome(){
    const dateArray = date.split("-");
    const inputYear = dateArray[0]
    const inputMonth = dateArray[1]
    const inputDate = dateArray[2]
    let flag = checkDatesCombo(inputYear, inputMonth, inputDate);
    if(flag){
      newOutput = `yay! you're birthdate, in ${flag} format is palindrome 🎉`
    }
    else{
      let [nextDate, diff] = findNextDate(inputDate, inputMonth, inputYear);
      newOutput = `Ahh!!, you missed it by ${diff} days, Next palindrome date is ${nextDate}`
    }
    setOutput(<p>{newOutput}</p>);
  }
  function checkDatesCombo(yyyy, mm, dd){
    //generating date format strings
    //yyyymmdd
    const dateFormat1 = yyyy+mm+dd;

    //ddmmyyyy
    const dateFormat2 = dd+mm+yyyy;

    //mmddyyyy
    const dateFormat3 = mm+dd+yyyy;
    
    //ddmmyy
    const dateFormat4 = dd+mm+yyyy.substring(2);

    if(isPalindrome(dateFormat1)){
      return (`${dd}-${mm}-${yyyy}`);
    }
    else if(isPalindrome(dateFormat2)){
      return (`${dd}-${mm}-${yyyy}`)
    }
    else if(isPalindrome(dateFormat3)){
      return (`${dd}-${mm}-${yyyy}`)
    }
    else if(isPalindrome(dateFormat4)){
      return (`${dd}-${mm}-${yyyy.substring(2)}`)
    }
    else{
      return null
    }
  }
  function isPalindrome(dateFormat){
    const mid = Math.floor(dateFormat.length/2);
    for(let i = 0; i < mid; i++){
      if(dateFormat[i]!=dateFormat[dateFormat.length - 1 - i]){
        return false;
      }
    }
    return true;
  }

function findNextDate(date, month, year){
  let date1= Number(date);
  let month1= Number(month);
  let year1=Number(year);
  
  for(let i=1; i>0; i++){

    //forward check
    date1 = date1+1;
    if(date1 > Number(daysInMonth[month1-1])){
        date1 = 1;
        month1 = month1+1;
        if(month1 > 12){
            month1 = 1;
            year1 = year1+1;
        }
    }
    let yyString = year1.toString();
    let mmString = month1.toString();
    let ddString = date1.toString();
    if(mmString.length==1){
        mmString="0"+mmString;
    }
    if(ddString.length==1){
        ddString="0"+ddString;
    }
    let setFlagNextDate = checkDatesCombo(yyString, mmString, ddString);
    if(setFlagNextDate){
        return [`${setFlagNextDate}`, i];
    }
  }
}
// check for leap year
function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}


  return (
    <div className="App">
      <div className="heading">
        <HiCalendar className='icon'/>&nbsp;
        <h3>Birthday Palindrome.</h3>
      </div>
      <div className="card">
        <div className="intro">
          <h1>Enter your birthdate and we will let you know if it is palindrome.</h1>
          <p>This app checks your birthdate in 4 formats <b>yyyy-mm-dd, dd-mm-yyyy, mm-dd-yyyy, dd-mm-yy</b>&nbsp;
e.g. if your birthdate is <b>01 Aug 1995</b> , then app will check for <b>19950801, 01081995, 080195, 1081995</b> and checks if it is palindrome. </p>
        </div>
        <div className="input">
          <input type="date" name="dob" id="dobpicker" max="9999-12-31" onChange={(e) => {setDate(e.target.value)}} required/>
          <button onClick={inputHandler} className="button">Check</button>
        </div>
        <div className="output">
          {output}
        </div>
      </div>
    </div>
  )
}

export default App
