import { useState } from 'react'
import { HiCalendar } from "react-icons/hi";
import { TiWarning } from "react-icons/ti";
import './App.css'
import loadingGif from './assets/cat-what.gif'

function App() {
  const [output, setOutput] = useState("");
  let date;
  let newOutput = "";
  const daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
  const inputHandler = (e) => {
      if(date){
        setOutput(<img src={loadingGif}></img>);
        setTimeout(() => {
          checkPalindrome()
        }, 30)
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
      newOutput = `yay! you're birthdate in ${flag} format is palindrome 🎉`
    }
    // else{
    //   let [nextDate, diff] = findNextDate(inputDate, inputMonth, inputYear);
    //   newOutput = `Ahh!!, you missed it by ${diff} days, Next palindrome date is ${nextDate}`
    // }
    setOutput(<p>{newOutput}</p>);
  }
  function checkDatesCombo(yyyy, mm, dd){
    //generating date format strings
    //yyyymmdd
    const dateFormat1 = yyyy+mm+dd;
    console.log(dateFormat1)

    //ddmmyyyy
    const dateFormat2 = dd+mm+yyyy;
    console.log(dateFormat2)

    //mmddyyyy
    const dateFormat3 = mm+dd+yyyy;
    console.log(dateFormat3)

    
    //ddmmyy
    const dateFormat4 = dd+mm+yyyy.substring(2);
    console.log(dateFormat4)


    // //mmddyy
    // const dateFormat5 = mm+dd+yyyy.substring(2);
    // console.log(dateFormat5)


    // // yymmdd
    // const dateFormat6 = yyyy.substring(2)+mm+dd;
    // console.log(dateFormat6)


    if(isPalindrome(dateFormat1)){
      console.log (`from palindrome func - ${yyyy}-${mm}-${dd}`);
    }
    else if(isPalindrome(dateFormat2)){
      console.log (`from palindrome func - ${dd}-${mm}-${yyyy}`)
    }
    else if(isPalindrome(dateFormat3)){
      console.log (`from palindrome func - ${mm}-${dd}-${yyyy}`)
    }
    else if(isPalindrome(dateFormat4)){
      console.log (`from palindrome func - ${dd}-${mm}-${yyyy.substring(2)}`)
    }
    // else if(isPalindrome(dateFormat5)){
    //   return (`${mm}-${dd}-${yyyy.substring(2)}`)
    // }
    // else if(isPalindrome(dateFormat6)){
    //   return (`${yyyy.substring(2)}-${mm}-${dd}`)
    // }
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
    let date1 = Number(date);
    let month1 = Number(month);
    let year1 = Number(year);

    for(let i = 1; i > 0; i++){
      date1 = date1 + 1;
      if(date1 > Number(daysInMonth[month1 - 1])){
        date1 = 1;
        month1 = month1 + 1;
        if(month1 > 12){
          month1 = 1;
          year1 = year1 + 1;
        }
      }
      let dateStr = date1.toString()
      let monthStr = month1.toString()
      let yearStr = year1.toString()

      if(dateStr.length == 1){
        dateStr = "0"+dateStr;
      }
      if(monthStr == 1){
        monthStr = "0"+monthStr;
      }

      let nextDateFlag = checkDatesCombo(yearStr, monthStr, dateStr);
      if(nextDateFlag){
        return [`${nextDateFlag}`, i];
      }
    }

  }



  return (
    <div className="App">
      <div className="heading">
        <HiCalendar className='icon'/>&nbsp;
        <h3>Birthday Palindrome.</h3>
      </div>
      <div className="card">
        <div className="intro">
          <h1>Enter your birthdate and we will tell you if your birthdate  is a palindrome.</h1>
          <p>This app checks your birthdate in 4 formats <b>yyyy-mm-dd, dd-mm-yyyy, mm-dd-yyyy, dd-mm-yy</b>&nbsp;
e.g. if your birthdate is <b>01 Aug 1995</b> , then app will check for <b>19950801, 01081995, 080195, 1081995</b> </p>
        </div>
        <div className="input">
          <input type="date" name="dob" id="dobpicker" max="9999-12-31" onChange={(e) => {date = e.target.value}} required/>
          <button onClick={inputHandler}>Check</button>
        </div>
        <div className="output">
          {output}
        </div>
      </div>
    </div>
  )
}

export default App
