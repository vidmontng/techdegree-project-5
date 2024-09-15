
const body = document.querySelector('body');
create_modal();
const overlay = document.getElementById('modal-container');
overlay.style.display = 'none';
const btn_close = document.getElementById('modal-close-btn');
const btn_prev = document.getElementById('modal-prev');
const btn_next = document.getElementById('modal-next');
const gallery = document.querySelector('#gallery');
let arrayOfUsers;
const userCards = document.getElementsByClassName('card');
const modal_img = document.querySelector('.modal-img');
const modal_name = document.querySelector('#modal-name');
const modal_email = document.querySelector('#modal-email');
const modal_location = document.querySelector('#modal-city');
const modal_phone = document.querySelector('#modal-phone');
const modal_address = document.querySelector('#modal-address');
const modal_birthday = document.querySelector('#modal-birthday');
const search_container = document.querySelector('div[class="search-container"]');
const array_of_names = [];
let all_user_names;
let array_of_displayed_names = [];

fetchData();

//main function, fetching data
async function fetchData() {
    try {
    const reponse = await fetch('https://randomuser.me/api/?results=12&nat=AU,CA,GB,IE,IN,NZ,US&inc=picture,name,dob,email,location,phone,nat');
    const data = await reponse.json();
    arrayOfUsers = data.results;
    arrayOfUsers.forEach( user => displayUser(user));
    createSearchBar();   
    console.log(arrayOfUsers);
    } catch (error){
        console.log(error);
    }
}
/***************************************************************************************************************************************
 * DYNAMICALLY ADDING SEARCH FIELD *AND* ADDING FUNCTIONALITY TO IT IN ONE FUNCTION THAT WILL BE PASSED TO THE MAIN FUNCTION fetchData()
 ****************************************************************************************************************************************/

function createSearchBar() {
    const searchBar = `<form action="#" method="get">
                            <input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        </form>`;   
            search_container.insertAdjacentHTML('beforeend', searchBar); 

            document.getElementById('search-input').addEventListener('keyup', (e)=> {
                gallery.innerHTML = '';
                arrayOfUsers.forEach( user => {
                    const full_name = `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()}`;
                    const search_input = e.target.value.toLowerCase();
                    if (full_name.includes(search_input)) {
                        displayUser(user);
                    }
                });            
            });
 }


/******************************************
 * CREATING MODAL AND ADDING IT TO THE PAGE 
 ******************************************/
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
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>
    `;      
body.insertAdjacentHTML('beforeend', modal);
}


/****************************
 * DISPPLAYING ALL USER CARDS
 ****************************/
function displayUser (userInfo) {
    
       const userCard =  `<div class="card">
                            <div class="card-img-container">
                                <img class="card-img" src="${userInfo.picture.medium}" alt="profile picture">
                            </div>
                            <div class="card-info-container">
                                <h3 id="name" class="card-name cap">${userInfo.name.first} ${userInfo.name.last}</h3>
                                <p class="card-text">${userInfo.email}</p>
                                <p class="card-text cap">${userInfo.location.city}, ${userInfo.location.state}</p>
                            </div>
                        </div>`
        gallery.insertAdjacentHTML('beforeend', userCard);
}

/*************************************
 * EVENT LISTENER FOR REVEALING MODALS            
 *************************************/
   gallery.addEventListener('click', (e) => {
        const target_user_card = e.target.closest('.card');

        if (target_user_card) {
            overlay.style.display = 'block';

            const target_userCard_nameElement = target_user_card.querySelector('[id="name"]');
            const target_user_name = target_userCard_nameElement.textContent;
            const allNames =  document.querySelectorAll('#name');
            array_of_displayed_names = [];
            arrayOfUsers.forEach( user => {
                const full_name = `${user.name.first} ${user.name.last}`;
                if (target_user_name === full_name) {
                    customize_modal(user);
                }
                for (let i=0; i<allNames.length; i++) {
                    const card_name = allNames[i].textContent;
                        if (card_name === full_name) {
                            array_of_displayed_names.push(user);
                        }
            }
        });
        }   
        return array_of_displayed_names;
    })


/*******************
 * CUSTOMIZING MODALS
 *******************/

 function customize_modal (user) {
    const full_name = `${user.name.first} ${user.name.last}`;
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
        document.getElementById('modal-birthday').textContent = `Birthday: ${month}/${day}/${year}`;
 }


/************************************************************************************************************
 * ADDING EVENT LISTENER TO THE 'CLOSE' BUTTON  **AND** CLOSING THE MODAL BY CLICKING ANYWHERE ELSE OUTSIDE THE MODAL 
 ***********************************************************************************************************/
[btn_close, overlay].forEach( target => {
    target.addEventListener('click', (e) => {
        if (e.target.closest('#modal-close-btn')) {
            overlay.style.display = 'none';
        }

        if (overlay.style.display === 'block' && !e.target.closest('.modal')) {
            overlay.style.display = 'none';
        }

    });

});

/******************************************************
 * EVENT LISTENERS FOR BOTH BUTTONS - "PREV" AND "NEXT".    Also added closing modals by pressing Escape key
 *****************************************************/


[btn_prev, btn_next].forEach( button => {
    button.addEventListener('click', (e) => {
    const target_modal = e.target.closest('.modal');
    const name = target_modal.querySelector('#modal-name').textContent;

    for (let i=0; i<array_of_displayed_names.length; i++){        
        const full_name = `${array_of_displayed_names[i].name.first} ${array_of_displayed_names[i].name.last}`;

        //for "Prev" button
        if (e.target.textContent === 'Prev') {
            if (name === full_name && i !== 0) {
                customize_modal (array_of_displayed_names[i-1])
            }
        }

        //for "Next" button
        if (e.target.textContent === 'Next') {
            if (name === full_name && i < array_of_displayed_names.length - 1) {
                customize_modal (array_of_displayed_names[i+1])
            }
        }
    }
    });
});


document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'block') {
        const current_modal = document.querySelector('.modal');
        const currentModal_name = current_modal.querySelector('#modal-name').textContent;

        for (let i=0; i<array_of_displayed_names.length; i++) {
            const full_name = `${array_of_displayed_names[i].name.first} ${array_of_displayed_names[i].name.last}`;
            
            //swipe left
            if (e.key === "ArrowLeft") {

                    if (currentModal_name=== full_name && i !== 0) {
                        customize_modal (array_of_displayed_names[i-1])
                    }
            }

            //swipe right
            if (e.key === "ArrowRight") {
                
                    if (currentModal_name=== full_name && i < array_of_displayed_names.length - 1) {
                        customize_modal (array_of_displayed_names[i+1])
                    }
            }
        }

        //close modal by pressing Escape key
        if (e.key === "Escape") {

            overlay.style.display = 'none';
        }
        
    }
})

/**
 * This is working!!!
 */


// [btn_prev, btn_next].forEach( button => {
//     button.addEventListener(trigger, (e) => {
//     const target_modal = e.target.closest('.modal');
//     const name = target_modal.querySelector('#modal-name').textContent;

        

//     action('click', name);



//     });
// });

    /**********
    for (let i=0; i<array_of_displayed_names.length; i++){        
        const full_name = `${array_of_displayed_names[i].name.first} ${array_of_displayed_names[i].name.last}`;
        //for "Prev" button
        if (e.target.textContent === 'Prev') {
            if (name === full_name && i !== 0) {
                customize_modal (array_of_displayed_names[i-1])
            }
        }
        //for "Next" button
        if (e.target.textContent === 'Next') {
            if (name === full_name && i < array_of_displayed_names.length - 1) {
                customize_modal (array_of_displayed_names[i+1])
            }
        }
    }



****/


// function action(trigger, target_name) {
//         for (let i=0; i<array_of_displayed_names.length; i++){        
//             const full_name = `${array_of_displayed_names[i].name.first} ${array_of_displayed_names[i].name.last}`;

//             if (trigger === 'click') {

//                 //for "Prev" button
//                 if (ev_target.textContent === 'Prev') {
//                     if (target_name === full_name && i !== 0) {
//                         customize_modal (array_of_displayed_names[i-1])
//                     }
//                 }

//                 if (ev_target.textContent === 'Next') {
//                     if (target_name === full_name && i < array_of_displayed_names.length - 1) {
//                         customize_modal (array_of_displayed_names[i+1])
//                     }
//                 }  
//             }
//         }
// }










/**
 * This will return all children of the parent node that are not the element.
 */
// function getAllSiblings(element, parent) {
//     const children = [...parent.children];
//     return children.filter(child => child !== element);
// }






















//regex for phone
// function isValidTelephone(telephone) {
//     return  /^\D*\d{3}\D*\d{3}\D*\d{4}\D*$/.test(telephone);
//   }