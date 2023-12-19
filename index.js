const model = setModel();
let partIndexStart = 0;
let partIndexEnd = 99;
const tbody = document.querySelector("tbody");

const lastObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { /* для каждого наблюдаемого элемента */
        if (entry.isIntersecting) { /* если элемент находится в видимой части браузера */
            /* то подгружаем очередные 10 постов */
            renderPart();
        }

    })
});

/* настраиваем наблюдение */
const firstObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { /* для каждого наблюдаемого элемента */
        if (entry.isIntersecting) { /* если элемент находится в видимой части браузера */
            console.log(123)
        }
        firstObserver.unobserve(entry.target)
        // entry.target.remove()
        firstObserver.observe(document.querySelector('.row:last-child'))
    })
});

const everyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { /* для каждого наблюдаемого элемента */
        if (entry.isIntersecting) { /* если элемент находится в видимой части браузера */
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
    }
    if(document.querySelectorAll(".row").length > 200) {
        removePart()
    }

    partIndexStart +=100;
    partIndexEnd+=100;
}

function removePart() {
    for(let i = 0; i <= 99; i ++) {
            document.querySelectorAll('.row')[0].remove();
    }
}

renderPart();
firstObserver.observe(document.querySelector(".row:last-child"))
lastObserver.observe(document.querySelector(".loader"))
