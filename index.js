const model = setModel();
let partIndexStart = 0;
let partIndexEnd = 99;
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
            partIndexStart -=100;
            partIndexEnd-=100;
            everyObserver.unobserve(entry.target)
            removePart(true)

            for(let i = entry.target.dataset.id - 21; i>entry.target.dataset.id - 121; i-- ) {
                if(model[i]) {
                    renderRow(model[i], true);
                }
            }
            if(entry.target.dataset.id - 121 > 0) {
                everyObserver.observe(document.querySelector(".row:nth-child(20)"));

            }
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

function renderRow(modelItem, before = false) {
    const row = document.createElement("tr");
    const idCol = document.createElement("td");
    idCol.innerText = modelItem.id;
    const valueCol = document.createElement("td");
    valueCol.innerText = modelItem.value;
    const DescCol = document.createElement("td");
    DescCol.innerText = modelItem.description;

    row.append(idCol);
    row.append(valueCol);
    row.append(DescCol);
    row.classList.add("row");
    row.dataset.id = modelItem.id;

    if(before) {
        tbody.prepend(row);
    }else {
        tbody.append(row);
    }
}

function renderPart() {
    for(let i = partIndexStart; i <= partIndexEnd; i++) {
        renderRow(model[i]);
    }
    if(document.querySelectorAll(".row").length > 200) {
        removePart()
        everyObserver.observe(document.querySelector(".row:nth-child(20)"));
    }
    partIndexStart +=100;
    partIndexEnd+=100;
}

function removePart(tail=false) {
    for(let i = 0; i <= 99; i ++) {
        if(tail) {
            document.querySelector(".row:last-child").remove();
        }else {
            document.querySelectorAll('.row')[0].remove();
        }
    }
}

renderPart();
lastObserver.observe(document.querySelector(".loader"))
