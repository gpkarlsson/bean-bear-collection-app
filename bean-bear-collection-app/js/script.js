const ownedCheckbox = document.getElementById('collectCheckbox');
const bearContainer = document.getElementById('bear-container');
const allGenerations = bearData.generations;
const allBearNames = [];
// console.log("Number of edit buttons found:", document.querySelectorAll('.edit-bear').length);
// console.log('top')
for (const genKey in allGenerations) {
    const generationBears = allGenerations[genKey];
    allBearNames.push(generationBears);
}

//loop through each generation  
Object.entries(bearData.generations).forEach(([genName, bearArray]) => {

    // 1. Create section for this generation
    const genSection = document.createElement("div");
    genSection.className = 'generation-section';

    // 2. Add a title
    const title = document.createElement('h2');
    title.textContent = `Generation ${genName.replace('gen', '')}`;
    genSection.appendChild(title);
    genSection.className = 'generation-section container-fluid'

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'row';

    bearArray.forEach((bearData, idx) => { //use idx param instead of indexOf
        //  console.log(`Processing bear ${genName}: ${bearData.bearName}`);
        const card = document.createElement('div');
        card.className = 'col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5 bear-card';
        card.dataset.gen = genName;
        card.dataset.index = idx; //Use loop index

        //TODO: make it look nice
        //TODO: add check for limited edition bears, only render total prod num if limited edition
        //TODO: fix display names for non numbered generations

        card.innerHTML = `
    <div class="card h-100">
        <img src="${bearData.imagePath || '#'}" class="card-img-top" alt="Bear: ${bearData.bearName}">
        <div class="card-body shadow p-3 d-flex flex-column">
            <p class="card-text"><b>Name:</b> ${bearData.bearName}</p>
            <p class="card-text"><b>Birthday:</b> ${bearData.birthday}</p>
            <p class="card-text"><b>Venue:</b> ${bearData.venue}</p>
            <p class="card-text"><b>Year Released:</b> ${bearData.year}</p>
            <p class="card-text tour-memory lh-lg"><b>Tour memory:</b> ${bearData.tourMemory}</p>
            <p class="card-text">
           <span class="badge ${bearData.inCollection ? 'bg-success' : 'bg-danger'} me-2"> ${bearData.inCollection ? '✓ Bear' : '✖ Bear'} </span>
           <span class="badge ${bearData.hasHangtag ? 'bg-success' : 'bg-danger'}"> ${bearData.hasHangtag ? '✓ Hangtag' : '✖ Hangtag'} </span>
           <button class="btn btn-sm btn-primary edit-bear"
            data-gen="${genName}"
            data-index="${idx}">
            Edit Bear
            </button>
        </div>
    </div>
    `;
        cardsContainer.appendChild(card);
    });
    genSection.appendChild(cardsContainer);
    bearContainer.appendChild(genSection);
    //  console.log(`Finished bear ${genName, bearData.bearName}`);
});

document.querySelectorAll('.edit-bear').forEach(btn => {
    btn.addEventListener('click', function(){
        console.log("Button clicked!");
        const genName = this.dataset.gen;
        const index = this.dataset.index;
        const bear = bearData.generations[genName][index];

        //open edit interface with bear data
        openEditForm(bear, genName, index);
        
    });
});

function openEditForm(bear, genName, index, event){

     console.log("openEditForm called!");
     console.log("Bear data:", bear);
//TODO: FIX IS BEAR OWNED CHECKBOX NOT DISPLAYING!
    const form = document.createElement('div');
    form.className = "edit-form mt-3 p-3 border rounded" 
    form.innerHTML = `
    <h6> Edit ${bear.bearName}</h6>
    <input class="form-control mb-2" value="${bear.bearName}" id="edit-name-${index}">
    <input class="form-control mb-2" value="${bear.birthday}" id="edit-birthday-${index}">
    <input class="form-control mb-2" value="${bear.venue}" id="edit-venue-${index}">
    <input class="form-control mb-2" value="${bear.year}" id="edit-year-${index}">
    <textarea class="form-control mb-2" id="edit-memory-${index}">${bear.tourMemory}</textarea>
    <div class="form-check mb-2>
          <input type="checkbox" class="form-check-input" id="edit-owned-${index}" ${bear.inCollection ? 'checked' : ''}>
        <label class="form-check-label" for="edit-owned-${index}">In Collection</label>
        </div>
        <div class="form-check mb-2">
            <input type="checkbox" class="form-check-input" id="edit-hangtag-${index}">Has Hangtag</label>
        </div>
        <button class="btn btn-success btn-sm me-2" onclick="saveBear('${genName}', ${index})">Save</button>
        <button class="btn btn-secondary btn-sm" onclick="cancelEdit('${genName}', ${index})">Cancel</button>
    `;

    const selector = `.bear-card[data-gen="${genName}"][data-index="${index}"]`;
    console.log("Selector:", selector);

    const card = document.querySelector(selector);
    
    if (card) {
        //remove any existing edit forms
        const existingForm = card.querySelector('.edit-form');
        if (existingForm) existingForm.remove();

        //append form to card body
        const cardBody = card.querySelector('.card-body');
        cardBody.appendChild(form);
        console.log("Form appended to child");
    } else {
        console.error("Card not found with selector:", selector)
    }
};

function saveBear(genName, index){
    console.log("Saving bear:", genName, index);

    //Get values from form

    const newName = document.getElementById(`edit-name-${index}`).value;
    const newBirthday = document.getElementById(`edit-birthday-${index}`).value;
    const newVenue = document.getElementById(`edit-venue-${index}`).value;
    const newYear = document.getElementById(`edit-year-${index}`).value;
    const newMemory = document.getElementById(`edit-memory-${index}`).value;
    const newOwned = document.getElementById(`edit-owned-${index}`).checked;
    const newHangtag = document.getElementById(`edit-hangtag-${index}`).checked;

    //Update data

    const bear = bearData.generations[genName][index];
    bear.bearName = newName;
    bear.birthday = newBirthday;
    bear.venue = newVenue;
    bear.year = newYear;
    bear.tourMemory = newMemory;
    bear.inCollection = newOwned;
    bear.hasHangtag = newHangtag;

    //Save to local storage
    localStorage.setItem('bearData', JSON.stringify(bearData));

    //refresh page to see changes
    location.reload();

    //TODO: fix so that data persists to card - can it write to json file?

};

function cancelEdit(genName, index){
    console.log("Cancelling edit for:", genName, index);
    const selector = `.bear-card[data-gen="${genName}"][data-index="${index}"]`;
    const card = document.querySelector(selector);
    const form = card.querySelector('.edit-form');
    if (form) form.remove();

    //TODO: make editing inline
}



const bearCard = document.getElementsByClassName("card");

//!! IDEAS FOR FUTURE FEATURES: 
// ** If bear is not in collection, search eBay using eBay Browse API and/or ebay Notification API to send emails of newly listed bears that are not in collection
// ** user authentication
// ** conditionally render owned/non-owned/all bears
// ** 