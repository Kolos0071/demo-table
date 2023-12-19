const model = setModel();
let partIndexStart = 0;
let partIndexEnd = 99;
let renderedElements = []
let deletedElements = [];
const tbody = document.querySelector("tbody");

const lastObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            renderPart();
        }

    })
});

const everyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        }
    })
});

function setModel() {
    const model = [];
    for(let i= 0; i < 500000; i++) {
        model.push({
            id: i,
            value: Math.random() * 1000,
            description: (Math.random()+1).toString(16).substring(2)
        })
    }
    return model;
}

function renderPart() {
    for(let i = partIndexStart; i <= partIndexEnd; i++) {
        const row = document.createElement("tr");
        const idCol = document.createElement("td");
        idCol.innerText = model[i].id;
        const valueCol = document.createElement("td");
        valueCol.innerText = model[i].value;
        const DescCol = document.createElement("td");
        DescCol.innerText = model[i].description;

        row.append(idCol);
        row.append(valueCol);
        row.append(DescCol);
        row.classList.add("row");
        row.dataset.id = i;
        tbody.append(row);
        renderedElements.push(i)
    }
    if(document.querySelectorAll(".row").length > 200) {
        removePart()
    }
    partIndexStart +=100;
    partIndexEnd+=100;
    console.log(renderedElements)
}

function removePart() {
    for(let i = 0; i <= 99; i ++) {
        deletedElements.push( renderedElements.shift());
        document.querySelectorAll('.row')[0].remove();
    }
    console.log(deletedElements)
}

renderPart();
document.addEventListener("scroll",e=>{
    if(window.scrollY === 0) {
    }
})
lastObserver.observe(document.querySelector(".loader"))
