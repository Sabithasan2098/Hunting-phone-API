const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones);
};

const displayPhone = (phones) => {
  // console.log(phones)
  const phoneDiv = document.getElementById("phone-container");

  phoneDiv.innerHTML = "";
  // ----------
  const showAll = document.getElementById("show-all");
  if (phones.length > 10) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  phones = phones.slice(0, 10);
  // ----------
  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  p-4 bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
         <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary" onclick = "handleShowDetails( '${phone.slug}' )" >Show Details</button>
            </div>
        </div>`;
    phoneDiv.appendChild(phoneCard);
  });
  toggleSpiner(false);
};

// ----------------

const getText = () => {
  toggleSpiner(true);
  const inputText = document.getElementById("search-field");
  const searchText = inputText.value;
  console.log(searchText);
  loadPhone(searchText);
};

// --------------loading-spiner
const toggleSpiner = (spiner) => {
  const loadingSpiner = document.getElementById("loading-spiner");
  if (spiner) {
    loadingSpiner.classList.remove("hidden");
  } else {
    loadingSpiner.classList.add("hidden");
  }
};
// ---------show-modal
const handleShowDetails = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id} `
  );
  const data = await res.json();
  const phone = data.data;
  displayModalDetails(phone);
};

// -----------display-modal
const displayModalDetails = (phone) => {
  console.log(phone)
  show_details_modal.showModal()
  const modalDetails = document.getElementById('modal-details');
  modalDetails.innerHTML = `
  <image src="${phone.image}"> </image>
  <h1><span>Name:</span> ${phone.name} </h1>
  <h3><span>Storage:</span> ${phone.mainFeatures.storage}</h3>
  <h3><span>Display Size:</span> ${phone.mainFeatures.displaySize}</h3>
  `
};
