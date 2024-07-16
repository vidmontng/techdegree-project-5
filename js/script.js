const gallery = document.querySelector('#gallery');
let arrayOfUsers;
const userCards = document.getElementsByClassName('card');
//variables for working with modals
const overlay = document.querySelector('.modal-container');
overlay.style.display = 'none';
const modal_img = document.querySelector('.modal-img');
const modal_name = document.querySelector('#modal-name');
const modal_email = document.querySelector('#modal-email');
const modal_city = document.querySelector('#modal-city');
const modal_phone = document.querySelector('#modal-phone');
const modal_address = document.querySelector('#modal-address');
const modal_birthday = document.querySelector('#modal-birthday');

const close_button = document.querySelector('.modal-close-btn');

async function fetchData() {
    try {
    const reponse = await fetch('https://randomuser.me/api/?results=12&inc=picture,name,email, location');
    const data = await reponse.json();
    // console.log(data.results);
    displayUser(data.results);
    arrayOfUsers = data.results;
    console.log(arrayOfUsers);

    } catch (error){
        console.log(error);

    }
}
fetchData();

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


gallery.addEventListener('click', (e) => {
    const userName = e.target.closest('.card').querySelector('[id="name"]');
    const name = userName.textContent;
    console.log(name);

    arrayOfUsers.forEach( user => {
        const first_last = `${user.name.first} ${user.name.last}`;

        if ( name === first_last) {
            overlay.style.display = 'block';
            modal_img.src = `${user.picture.medium}`;
            modal_name.textContent = first_last;
            modal_email.textContent = `${user.email}`;
            modal_city.textContent = `${user.location.city}`;
            modal_phone.textContent = `${user}`;
            // console.log(user.email);
        }
    });


});

close_button.addEventListener('click', () => {
    overlay.style.display = 'none';
});