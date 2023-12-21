const model = setModel();
let counterDown = 0;
let counterUp = 0;
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
            renderPartBefore(entry.target);
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
    if(counterDown < model.length) {
        for(let i = counterDown; i <= counterDown + 99; i++) {
            renderRow(model[i]);
        }
        counterDown +=100;
        if(document.querySelectorAll(".row").length > 200) {
            removePart()
            counterUp +=100;
            everyObserver.observe(document.querySelector(".row:nth-child(20)"));
        }
    }
}

function renderPartBefore(target) {
    if(counterUp > 0) {
        everyObserver.unobserve(target)
        removePart(true)
        for(let i = counterUp-1; i>counterUp - 101; i-- ) {
            if(model[i]) {
                renderRow(model[i], true);
            }
        }
        counterUp -=100;
        everyObserver.observe(document.querySelector(".row:nth-child(20)"));

    }
}

function removePart(tail=false) {
    for(let i = 0; i <= 99; i ++) {
        if(tail) {
            document.querySelector(".row:last-child").remove();
            counterDown --;
        }else {
            document.querySelectorAll('.row')[0].remove();
        }
    }
}

renderPart();
lastObserver.observe(document.querySelector(".loader"))
