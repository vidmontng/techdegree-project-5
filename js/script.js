const gallery = document.querySelector('#gallery');


async function fetchData() {
    try {
    const reponse = await fetch('https://randomuser.me/api/?results=12&inc=picture,name,email, location');
    const data = await reponse.json();
    console.log(data.results);
    displayUser(data.results);
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
        gallery. insertAdjacentHTML('beforeend', userCard);
    });
}