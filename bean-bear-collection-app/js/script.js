const ownedCheckbox = document.getElementById('collectCheckbox');
const bearContainer = document.getElementById('bear-container');
const allGenerations = bearData.generations;
const allBearNames = [];

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

    bearArray.forEach(bearData => {
        //  console.log(`Processing bear ${genName}: ${bearData.bearName}`);
        const card = document.createElement('div');
        card.className = 'col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-5 bear-card';
        //TODO: 
        //TODO: add check for limited edition bears, only render total prod num if limited edition
        //TODO: fix display names for non numbered generations
        //TODO: fix css classes so bears not owned display badge differently
        // //and change hasHangtag to yes/no depending on whether hasHangtag is true or not
        card.innerHTML = `
    <div class="card h-100">
        <img src="https://picsum.photos/200" class="card-img-top" alt="...">
        <div class="card-body shadow p-3 d-flex flex-column">
            <p class="card-text text-body-secondary"><b>Name:</b> ${bearData.bearName}</p>
            <p class="card-text"><b>Birthday:</b> ${bearData.birthday}</p>
            <p class="card-text"><b>Venue:</b> ${bearData.venue}</p>
            <p class="card-text"><b>Year Released:</b> ${bearData.year}</p>
            <p class="card-text tour-memory"><b>Tour memory:</b> ${bearData.tourMemory}</p>
            <p class="card-text">
           <span class="badge ${bearData.inCollection} ? bg-success : bg-secondary}"> ${bearData.inCollection ? '✓ Bear' : 'Not Owned'} </span>
           <span class="badge ${bearData.hasHangtag} ? bg-success : bg-secondary}"> ${bearData.hasHangtag ? '✓ Hangtag' : 'Not Owned'} </span>
        </div>
    </div>
    `;
        cardsContainer.appendChild(card);
    });
    genSection.appendChild(cardsContainer);
    bearContainer.appendChild(genSection);
    //  console.log(`Finished bear ${genName, bearData.bearName}`);
});

const bearCard = document.getElementsByClassName("card");

// Object.entries(bearData.generations).forEach(([genName, data]) => {
//   console.log(`${genName}:`, {
//     type: typeof data,
//     isArray: Array.isArray(data),
//     length: data.length,
//     firstItem: data[0],
//     firstItemType: typeof data[0]
//   });
// });


// function handleInCollectionCheckbox(){
//     if (ownedCheckbox.checked === false) {
//         bearCard.classList.add("hidden")
//     } 
// }
// handleInCollectionCheckbox()



//IDEAS FOR FUTURE FEATURES: If bear is not in collection, search eBay using eBay Browse API or ebay Notification API to send emails of newly listed bears that are not in collection