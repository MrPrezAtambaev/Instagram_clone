const USERS_API = 'http://localhost:8000/users';
const POSTS_API = 'http://localhost:8000/posts';

let registerModalBtn = document.querySelector('#registerModalBtn');
let loginModalBtn = document.querySelector('#loginModalBtn');
let registerModalBlock = document.querySelector('#registerUser-block');
let loginModalBlock = document.querySelector('#loginUser-block');
let registerBtn = document.querySelector('#registerBtn');
let loginBtn = document.querySelector('#loginBtn');
let closeModalBtn = document.querySelector('#closeBtn');
let logoutBtn = document.querySelector('#logoutBtn');

//hide/show modals
registerModalBtn.addEventListener('click', () => {
    registerModalBlock.setAttribute('style', 'display: flex !important;');
    registerBtn.setAttribute('style', 'display: flex !important;');
    loginModalBlock.setAttribute('style', 'display: none !important');
    loginBtn.setAttribute('style', 'display: none !important');
});

loginModalBtn.addEventListener('click', () => {
    registerModalBlock.setAttribute('style', 'display: none !important;');
    registerBtn.setAttribute('style', 'display: none !important;');
    loginModalBlock.setAttribute('style', 'display: flex !important');
    loginBtn.setAttribute('style', 'display: flex !important');
});

//const Web Api from JSON

//get data
async function getUsersData () {
    let res = await fetch(USERS_API);
    let users = await res.json();
    return users
};

//register

let regUsernameInp = document.querySelector('#reg-username');
let regPasswordInp = document.querySelector('#reg-password');
let regConfPasswordInp = document.querySelector('#reg-passwordConfirm');

registerBtn.addEventListener('click', register)

async function register () {

    if(
        !regUsernameInp.value.trim() ||
        !regPasswordInp.value.trim() ||
        !regConfPasswordInp.value.trim()
    ) {
        alert('Fill all inputs, some of them are empty!');
        return
    };

    if (regPasswordInp.value !== regConfPasswordInp.value) {
        alert('Passwords don\'t match');
        return;
    };

    let userObj = {
        username: regUsernameInp.value,
        password: regPasswordInp.value
    };

    let users = await getUsersData();

    fetch(USERS_API, {
        method: 'POST',
        body: JSON.stringify(userObj),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    });

    regUsernameInp.value = '';
    regPasswordInp.value = '';
    regConfPasswordInp.value = '';

    closeModalBtn.click();

    // render()

}

//authorization || login

let loginUsernameInp = document.querySelector('#login-username');
let loginPassInp = document.querySelector('#login-password');

let showUsername = document.querySelector('#showUsername');

function checkLoginLogoutStatus () {
    let user = localStorage.getItem('user');

    if(!user) {
        loginModalBtn.parentNode.style.display = 'block'; //если не авторизован то покажи
        logoutBtn.parentNode.style.display = 'none'; //спрячь
        showUsername.innerText = 'No user';
    } else {
        loginModalBtn.parentNode.style.display = 'none';  //спрячь
        logoutBtn.parentNode.style.display = 'block'; //покажи
        showUsername.innerText = JSON.parse(user).username;
    };

    // showCreatePostPanel();

}

checkLoginLogoutStatus(); //в момент загрузки, потому что вдруг он авторизовался еще вчера

function checkExistingUser (username, users) {
    return users.some(item => item.username === username)
};

function checkUserPass (user, password) {
    return user.password === password
};

function setUsersToStorage(username, id, favorites) {
    localStorage.setItem('user', JSON.stringify({
        username, 
        id
    }));
};

loginBtn.addEventListener('click', login);

async function login () {

    if (
        !loginUsernameInp.value.trim() || 
        !loginPassInp.value.trim()   
    ) {
        alert('Fill all inputs, some of them are empty!');
        return;
    };

    let users = await getUsersData();

    if(!checkExistingUser(loginUsernameInp.value, users)) {
        alert('There is no such user');
        return;
    };

    let userObj = users.find(item => item.username === loginUsernameInp.value); 

    if (!checkUserPass(userObj, loginPassInp.value)) {
        alert('Wrong password!');
        return;
    };

    setUsersToStorage(userObj.username, userObj.id, userObj.favorites);

    loginUsernameInp.value = '';
    loginPassInp.value = '';

    checkLoginLogoutStatus();

    closeModalBtn.click();

    // render()

};

//logout logic 
logoutBtn.addEventListener('click', ()=> {
    localStorage.removeItem('user');
    checkLoginLogoutStatus();
    // render()
});
