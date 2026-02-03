// console.log("All generation keys:", Object.keys(bearData.generations));
// console.log("gen1 data:", bearData.generations.gen1);
// console.log("gen2 data:", bearData.generations.gen2);
console.log('Bootstrap loaded?', typeof bootstrap !== 'undefined');
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
genSection.className = 'generation-section container mb-5'

const cardsContainer = document.createElement('div');
cardsContainer.className = 'row';

bearArray.forEach(bearData => {
    const card = document.createElement('div');
    card.className = 'col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-3';

    card.innerHTML = `
<div class="card">
    <img src="https://picsum.photos/200" class="card-img-top" alt="...">
    <div class="card-body shadow p-3">
        <h5 class="card-title ">${bearData.bearName}</h5>
        <input type="checkbox" name="inCollection" id="collectCheckbox">
        <label for="inCollection">Bear in collection</label>
        <p class="card-text"><b>Birthday:</b> ${bearData.birthday}</p>
        <p class="card-text"><b>Hangtag?</b> ${bearData.hasHangtag}</p>
        <p class="card-text"><b>Venue:</b> ${bearData.venue}</p>
        <p class="card-text"><b>Tour memory:</b> ${bearData.tourMemory}</p>
    </div>
</div>
`;

    cardsContainer.appendChild(card)
});
genSection.appendChild(cardsContainer);
bearContainer.appendChild(genSection);
});

const bearCard = document.getElementsByClassName("card");

// function handleInCollectionCheckbox(){
//     if (ownedCheckbox.checked === false) {
//         bearCard.classList.add("hidden")
//     } 
// }
// handleInCollectionCheckbox()



//IDEAS FOR FUTURE FEATURES: If bear is not in collection, search eBay using eBay Browse API or ebay Notification API to send emails of newly listed bears that are not in collection
