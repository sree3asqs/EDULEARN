const main_video = document.querySelector('.main-video video'),
    main_video_title = document.querySelector('.main-video .title'),
    video_playlist = document.querySelector('.video-playlist .videos');

let data = [
    {
        'id': 'a1',
        'title': 'Adobe photoshop beginning',
        'name': './videos/Adobe Photoshop CC Tutorial for Beginners.mp4',
        'duration': '12.12',

    },
    {
        'id': 'a2',
        'title': 'Adobe photoshop part 2',
        'name': './videos/Adobe Photoshop CC Tutorial for Beginners (Part №2).mp4',
        'duration': '1.20.12',

    },
    {
        'id': 'a3',
        'title': 'Adobe photoshop part 3',
        'name': './videos/Adobe Photoshop CC Tutorial for Beginners (Part №3).mp4',
        'duration': '1.50.32',

    },
    {
        'id': 'a4',
        'title': 'Adobe illustrator beginning',
        'name': './videos/Adobe Illustrator CC Tutorial for Beginners.mp4',
        'duration': '2.52.10',

    },
    {
        'id': 'a5',
        'title': 'Adobe illustrator part 2',
        'name': './videos/Adobe Illustrator CC Tutorial for Beginners (Part №2).mp4',
        'duration': '4.2.12',

    },
    {
        'id': 'a6',
        'title': 'Adobe indesign beginning',
        'name': './videos/Adobe InDesign CC Tutorial for Beginners.mp4',
        'duration': '5.22.52',

    },
    {
        'id': 'a7',
        'title': 'Adobe indesign part 2',
        'name': './videos/Adobe InDesign CC Tutorial for Beginners (Part №2).mp4',
        'duration': '7.51.29',

    },
];

data.forEach((video, i) => {
    let video_element = `
    <div class="video data-id=${video.id}">
        <img src="./images/icons8-play-48.png" alt="play button icon" />
        <p>0${i + 1}.</p>
        <h3 class="title">${video.title}</h3>
        <p class="time">${video.duration}</p>
    </div>
    `;
    video_playlist.innerHTML += video_element;
}
)
let videos = document.querySelectorAll('.video');
videos[0].classList.add('active');
videos[0].querySelector('img').src = './images/icons8-pause-30.png';


videos.forEach(selected_video => {
    selected_video.onclick = () => {
        for (all_videos of videos) {
            all_videos.classList.remove('active');
            all_videos.querySelector('img').src = './images/icons8-play-48.png';

        }
        selected_video.classList.add('active');
        selected_video.querySelector('img').src = './images/icons8-pause-30.png';
        let match_video = data.find(video => video.id == selected_video.dataset.id);
        main_video.src = match_video.name;
        main_video_title.innerHTML = match_video.title;
    }
});



/*for notes*/

const addBox = document.querySelector(".add-box"),
    popupBox = document.querySelector(".popup-box"),
    popupTitle = popupBox.querySelector("header p"),
    closeIcon = popupBox.querySelector("header i"),
    titleTag = popupBox.querySelector("input"),
    descTag = popupBox.querySelector("textarea"),
    addBtn = popupBox.querySelector("button");

const months = ["January", "Febrauary", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a Note";
    isUpdate = false;
    popupBox.classList.remove("show");
});



function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = ` <li class="note">
                            <div class="details">
                                <p>${note.title}</p>
                                <span>${note.description}</span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                    <ul class="menu">
                                        <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen">Edit</i></li>
                                        <li onclick="deleteNote(${index})"><i class="uil uil-trash">Delete</i></li>
                                    </ul>
                                </div>
                            </div>
                        </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

function showMenu(elem){
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show"); 
        }
    });
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "update Note";
    popupTitle.innerText = "update a Note";
    console.log(noteId, title, desc);
}


function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
        noteDesc = descTag.value;
    if (noteTitle || noteDesc) {
        let dateObj = new Date(),
            month = months[dateObj.getMonth()],
            day = dateObj.getDay(),
            year = dateObj.getFullYear();

        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }
        else{
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }

});