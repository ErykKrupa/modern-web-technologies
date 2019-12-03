function loadImages() {
    for (let i = 1; i <= 15; i++) {
        let label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="img" value=` + i + `.jpg ` + ((i === 1) ? `checked` : ``) + `>
                <div class="image" id=image` + i + `></div>`;
        document.getElementById("gallery").appendChild(label);
    }
    for (let i = 1; i <= 15; i++) {
        setLowQualityImage(i);
        loadLowQualityImage(i).then(loadHighQualityImage).then(setHighQualityImage);
    }
}

function loadLowQualityImage(position) {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = "compressed-img/" + position + ".jpg";
        img.addEventListener('load', e => resolve(position));
    });
}

function loadHighQualityImage(position) {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = "img/" + position + ".jpg";
        img.addEventListener('load', e => resolve(position));
    })
}

function setLowQualityImage(position) {
    document.getElementById(`image${position}`).style.backgroundImage = "url('compressed-img/" + position + ".jpg')";
}

function setHighQualityImage(position) {

    document.getElementById(`image${position}`).style.backgroundImage = "url('img/" + position + ".jpg')";
}

