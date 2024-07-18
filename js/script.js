const body = document.querySelector('body');
create_modal();
const overlay = document.getElementById('modal-container');
overlay.style.display = 'none';
const btn_close = document.getElementById('modal-close-btn');
const gallery = document.querySelector('#gallery');
let arrayOfUsers;
const userCards = document.getElementsByClassName('card');
//variables for working with modals
const modal_img = document.querySelector('.modal-img');
const modal_name = document.querySelector('#modal-name');
const modal_email = document.querySelector('#modal-email');
const modal_location = document.querySelector('#modal-city');
const modal_phone = document.querySelector('#modal-phone');
const modal_address = document.querySelector('#modal-address');
const modal_birthday = document.querySelector('#modal-birthday');
const search_container = document.querySelector('div[class="search-container"]');
const array_of_names = [];

async function fetchData() {
    try {
    const reponse = await fetch('https://randomuser.me/api/?results=12&nat=AU,CA,GB,IE,IN,NZ,US&inc=picture,name,dob,email,location,phone,nat');
    const data = await reponse.json();
    // console.log(data.results);
    displayUser(data.results);
    createSearchBar();
    arrayOfUsers = data.results;
    console.log(arrayOfUsers);
    } catch (error){
        console.log(error);

    }
}
fetchData();

/****
 * DISPPLAYING ALL USER CARDS
 */
function displayUser (data) {

    data.forEach( user => {
       const userCard =  `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                                <p class="card-text">${user.email}</p>
                                <p class="card-text cap">${user.location.city} ${user.location.state}</p>
                            </div>
                        </div>`
        gallery.insertAdjacentHTML('beforeend', userCard);
    });
}

/**
 * EVENT LISTENER FOR REVEALING MODALS 
 */
gallery.addEventListener('click', (e) => {
    const userName = e.target.closest('.card').querySelector('[id="name"]');
    const name = userName.textContent;
    overlay.style.display = 'block';
    arrayOfUsers.forEach( user => {
        const full_name = `${user.name.first} ${user.name.last}`;

        if ( name === full_name) {
            const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
            const dob = user.dob.date.substring(0, 10);
            const year = dob.substring(0,4);
            const month = dob.substring(5,7);
            const day = dob.substring(8);
            document.getElementById('modal-img').src = `${user.picture.medium}`;
            document.getElementById('modal-name').textContent = `${full_name}`;
            document.getElementById('modal-email').textContent = `${user.email}`;
            document.getElementById('modal-city').textContent = `${user.location.country}`;
            document.getElementById('modal-phone').textContent = `${user.phone}`;
            document.getElementById('modal-address').textContent = `${address}`;
            document.getElementById('modal-address').textContent = `Birthday: ${month}/${day}/${year}`;
        }
    
    });
})

/************
 * MODALS
 ***********/
function create_modal() {
        const modal = `
        <div id="modal-container" class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img id="modal-img" class="modal-img" src="" alt="profile picture">
                    <h3 id="modal-name" class="modal-name cap"></h3>
                    <p id="modal-email" class="modal-text"></p>
                    <p id="modal-city" class="modal-text cap"></p>
                    <hr>
                    <p id="modal-phone" class="modal-text"></p>
                    <p id="modal-address" class="modal-text"></p>
                    <p id="modal-birthday"class="modal-text"></p>
                </div>
            </div>
        `;      
    body.insertAdjacentHTML('beforeend', modal);
    }



//ADDING EVENT LISTENER TO THE 'CLOSE' BUTTON

btn_close.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//DYNAMICALLY ADDING SEARCH FIELD *AND* ADDING FUNCTIONALITY TO IT IN ONE FUNCTION THAT WILL BE PASSED TO THE MAIN FUNCTION fetchData()
function createSearchBar() {
    const searchBar = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;   
            search_container.insertAdjacentHTML('beforeend', searchBar); 

            document.getElementById('search-input').addEventListener('keyup', (e)=> {
                const search_results = [];
                gallery.innerHTML = '';
                arrayOfUsers.forEach( user => {
                    const full_name = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
                    const search_input = e.target.value.toLowerCase();
                    if (full_name.includes(search_input)) {
                        search_results.push(user);
                    }
                });            
                displayUser(search_results);
            });
 }



//regex for phone
// function isValidTelephone(telephone) {
//     return  /^\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(telephone);
//   }

