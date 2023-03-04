console.log("password Generator");

const password_length = document.querySelector("[data-passwordLength]");
const inputSlider = document.querySelector("[data-inputSlider]");
const checkboxs = document.querySelectorAll(".checkboxs");
const indicator = document.querySelector(".strenth-color");
const passwordDisplay = document.getElementById("passwordDisplay");
const copyPassword = document.querySelector("[data-copyContent]");
const copyBtn = document.getElementById("copyBtn");

//get checkbox 
const checkUpperCase = document.getElementById("hasUpperCase");
const checkLowerCase = document.getElementById("hasLowerCase");
const checkNumber = document.getElementById("hasNumber");
const checkSymboles = document.getElementById("hasSymboles");

// Symbol String
const symbole = "!@#$%^&*()_+[]{}<>?/~";

// init
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider()


function handleSlider() {
    inputSlider.value = passwordLength;
    password_length.textContent = passwordLength;

    let min = inputSlider.min;
    let max = inputSlider.max;

    let a = inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}
// get value of input slider 
inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider()
})

// Random integer Generator function
function getIntNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// Generate Random Number
function generateRandomNumber() {
    return getIntNumber(0, 9);
}

// Generate Random UpperCase
function generateRandomUpperCase() {
    return String.fromCharCode(getIntNumber(65, 90));
}

// Generate Random LowerCase
function generateRandomLowerCase() {
    return String.fromCharCode(getIntNumber(97, 122));
}

// Generate Random Symbole
function generateRandomSymbol() {
    const randomIndexNum = getIntNumber(0, symbole.length)
    return symbole.charAt(randomIndexNum);
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 8px 1px ${color}`;
}

function caclStrength() {

    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSymboles = false;

    // check if checkedbox are checked or not
    if (checkUpperCase.checked) hasUpperCase = true;
    if (checkLowerCase.checked) hasLowerCase = true;
    if (checkNumber.checked) hasNumber = true;
    if (checkSymboles.checked) hasSymboles = true;

    if (hasUpperCase && hasLowerCase && (hasNumber || hasSymboles) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if ((hasUpperCase || hasLowerCase) && (hasNumber || hasSymboles) && passwordLength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00")
    }

}

// checkbox handle
function handleCheckboxs() {
    checkCount = 0;
    checkboxs.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;
        // console.log(checkCount);
    })

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider()
    }
}
// all checkbox addEventListener "chang"
checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckboxs);
})

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyPassword.innerText = "copied";

    } catch (err) {
        copyPassword.innerText = "Failed";
    }

    copyPassword.classList.add("active")

    setTimeout(() => {
        copyPassword.classList.remove("active")
    }, 2000);
}

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent()
})


const generatePassword = document.querySelector("[data-generatePassword]");
generatePassword.addEventListener("click", () => {
    console.log("generate password");
    console.log(checkCount);
    if (checkCount == 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider()
    }

    // remove old password
    password = "";

    let funArr = [];

    if (checkUpperCase.checked)
        funArr.push(generateRandomUpperCase)

    if (checkLowerCase.checked)
        funArr.push(generateRandomLowerCase)

    if (checkNumber.checked)
        funArr.push(generateRandomNumber)

    if (checkSymboles.checked)
        funArr.push(generateRandomSymbol)

    // Compulsory add
    for (let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }

    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let randIndex = getIntNumber(0, funArr.length);
        password += funArr[randIndex]();
    }

    // suffle password
    password = sufflePassword(Array.from(password))
    // Show in UI
    passwordDisplay.value = password;
    caclStrength()

})

function sufflePassword(array) {
    // Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => {
        str += el;
    })
    return str;
}