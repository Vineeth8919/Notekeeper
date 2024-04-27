// console.log("hello");
/*
The NotesKeeping Application is a user-friendly web platform enabling CRUD operations (Create, Read, Update, Delete) for note management. Featuring an intuitive interface, users can efficiently create, view, update, and delete notes. Additionally, a robust search functionality facilitates quick access to specific notes, enhancing productivity and facilitates in better organising of the notes.
*/
showNotes();
let addBtn=document.getElementById("addBtn");

addBtn.addEventListener("click", function(e){
    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value="";
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
});

// function to show notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `  
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                
                <h5 class="card-title">${element.title}</h5>
                <textarea id="note${index}" style="border:none; outline:none; resize:none" class="card-text">${element.text}</textarea>
                <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-dark">Delete Note</button>
                <button id="${index}" onClick="saveNote(this.id)" class="btn btn-dark" style="margin-left: 15px; padding-left:20px; padding-right:20px">Save Note </button>
            </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    if (notesObj.length == 0) {
        notesElm.innerHTML = `"Oh, Ooo!! No notes to display, click Add Note to add notes"`
    }
}
// function to delete note
function deleteNote(index){
    // console.log("deleting note ", index);
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

// function to edit note using prompt
// function editNote(index) {
//     let noteContent = document.getElementById(`note${index}`).innerText;
//     let updatedNote = prompt("Edit your note:", noteContent);
//     if (updatedNote != null && updatedNote.trim() !== "") {
//         let notes = localStorage.getItem('notes');
//         if (notes == null) {
//             notesObj = [];
//         }
//         else {
//             notesObj = JSON.parse(notes);
//         }
//         notesObj[index] = updatedNote;
//         localStorage.setItem('notes', JSON.stringify(notesObj));
//         showNotes();
//     }
// }

//function to save note
function saveNote(index) {
    let updatedNote = document.getElementById(`note${index}`).value;
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj[index].text = updatedNote;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt');

search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    // console.log("input fired", inputVal);
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("textarea")[0].value;
            if(cardTxt.includes(inputVal)){
                element.style.display="block";
            }
            else{
                element.style.display="none";
            }
    })
})
