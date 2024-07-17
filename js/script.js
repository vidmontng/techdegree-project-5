const gallery = document.querySelector('#gallery');
let arrayOfUsers;
const userCards = document.getElementsByClassName('card');
//variables for working with modals
const overlay = document.querySelector('.modal-container');
overlay.style.display = 'none';
const modal_img = document.querySelector('.modal-img');
const modal_name = document.querySelector('#modal-name');
const modal_email = document.querySelector('#modal-email');
const modal_location = document.querySelector('#modal-city');
const modal_phone = document.querySelector('#modal-phone');
const modal_address = document.querySelector('#modal-address');
const modal_birthday = document.querySelector('#modal-birthday');
const search_container = document.querySelector('div[class="search-container"]');
const close_button = document.querySelector('.modal-close-btn');
const array_of_names = [];
// const search_field = document.getElementById('search-input');

async function fetchData() {
    try {
    const reponse = await fetch('https://randomuser.me/api/?results=12&nat=AU,CA,GB,IE,IN,NZ,US&inc=picture,name,dob,email,location,phone,nat');
    const data = await reponse.json();
    // console.log(data.results);
    displayUser(data.results);
    arrayOfUsers = data.results;
    console.log(arrayOfUsers);
    arrayOfUsers.forEach(user => {
        array_of_names.push(`${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`);
    });
    console.log(array_of_names);
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

/************
 * MODALS
 ***********/
gallery.addEventListener('click', (e) => {
    const userName = e.target.closest('.card').querySelector('[id="name"]');
    const name = userName.textContent;
    // console.log(name);

    arrayOfUsers.forEach( user => {
        const first_last = `${user.name.first} ${user.name.last}`;

        if ( name === first_last) {
            overlay.style.display = 'block';
            modal_img.src = `${user.picture.medium}`;
            modal_name.textContent = first_last;
            modal_email.textContent = `${user.email}`;
            modal_location.textContent = `${user.location.country}`;
            modal_phone.textContent = `${user.phone}`.replace();
            modal_address.textContent = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode} `;
            const dob = user.dob.date.substring(0, 10);
            const year = dob.substring(0,4);
            const month = dob.substring(5,7);
            const day = dob.substring(8);
            modal_birthday.textContent = `Birthday: ${month}/${day}/${year}`;
        }
    });


});

//ADDING EVENT LISTENER TO THE 'CLOSE' BUTTON
close_button.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//DYNAMICALLY ADDING SEARCH FIELD
function createSearchBar() {
    const searchBar = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;   
            search_container.insertAdjacentHTML('beforeend', searchBar); 
 }
 createSearchBar();

//SEARCH FIELD FUNCTIONALITY

document.getElementById('search-input').addEventListener('keyup', (e)=> {
    const search_results = [];
    arrayOfUsers.forEach( user => {
        const full_name = `${user.name.first} ${user.name.last}`;
        const search_input = e.target.value.toLowerCase();
        if (full_name.includes(search_input)) {
            search_results.push(user);
        }
    });            
    console.log(search_results);


});

//regex for phone
// function isValidTelephone(telephone) {
//     return  /^\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(telephone);
//   }

