let registerModalBtn: HTMLButtonElement = document.querySelector("#registerModalBtn");
let loginModalBtn: HTMLButtonElement = document.querySelector("#loginModalBtn");
let registerModalBlock: HTMLDivElement = document.querySelector("#registerUser-block");
let loginModalBlock: HTMLDivElement = document.querySelector("#loginUser-block");
let registerBtn: HTMLButtonElement = document.querySelector("#registerBtn");
let loginBtn: HTMLButtonElement = document.querySelector("#loginBtn");
let closeModalBtn: HTMLButtonElement = document.querySelector("#closeBtn");
let logoutBtn: HTMLButtonElement = document.querySelector("#logoutBtn");

//hide/show modals
registerModalBtn.addEventListener("click", () => {
registerModalBlock.setAttribute("style", "display: flex !important;");
registerBtn.setAttribute("style", "display: flex !important;");
loginModalBlock.setAttribute("style", "display: none !important");
loginBtn.setAttribute("style", "display: none !important");
});

loginModalBtn.addEventListener("click", () => {
registerModalBlock.setAttribute("style", "display: none !important;");
registerBtn.setAttribute("style", "display: none !important;");
loginModalBlock.setAttribute("style", "display: flex !important");
loginBtn.setAttribute("style", "display: flex !important");
});

let regUsernameInp: HTMLInputElement = document.querySelector("#reg-username");
let regPasswordInp: HTMLInputElement = document.querySelector("#reg-password");
let regConfPasswordInp: HTMLInputElement = document.querySelector("#reg-passwordConfirm");

registerBtn.addEventListener("click", register);

async function register() {
if (!regUsernameInp.value.trim() || !regPasswordInp.value.trim() || !regConfPasswordInp.value.trim()) {
alert("Fill all inputs, some of them are empty!");
return;
}

if (regPasswordInp.value !== regConfPasswordInp.value) {
alert("Passwords don't match");
return;
}

let userObj = {
username: regUsernameInp.value,
password: regPasswordInp.value
};


fetch(USERS_API, {
method: "POST",
body: JSON.stringify(userObj),
headers: {
"Content-Type": "application/json; charset=utf-8"
}
});

regUsernameInp.value = "";
regPasswordInp.value = "";
regConfPasswordInp.value = "";

closeModalBtn.click();

// render();
}




