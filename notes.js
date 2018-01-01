console.log('Starting Notes app');
const fs = require('fs'); //core node module

function fetchNotes(){
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch (e){
    return [];
  }
}

function saveNotes(notes){
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

//Print Notes
var printNotes = function(notes){
  debugger;
  for(var i=0;i<notes.length;i++){
    printOnConsole(notes[i]);
  }
}
var printOnConsole = function(note){
  console.log('----');
  console.log(`Title: ${note.noteTitle}`);
  console.log(`Body: ${note.noteBody}`);
}

//Add note
var addNote = function(title, body){
  var notes = [];
  var eachNote = {
    "noteTitle": title,
    "noteBody": body
  }

  notes = fetchNotes();

  var duplicateNotes = notes.filter(function(note){
    return note.noteTitle.toLowerCase() === title.toLowerCase();
  });

  if(duplicateNotes.length === 0){
    notes.push(eachNote);
    saveNotes(notes);
    return {'status':true,'noteTitle':title,'noteBody':body};
  }else{
    return {'status':false,'noteTitle':title};
  }
}

//List notes
var getAllNotes = function(){
  return fetchNotes();
}

//Read note
var readNote = function(title){
  var notes = fetchNotes();

  var selectedNote = notes.filter(function(eachNote){
    return eachNote.noteTitle === title;
  });
  if(selectedNote.length){
      return {status:true,"note":selectedNote,"message":"Note found!"}
  }else{
    return {status:false,"note":selectedNote,"message":"Note not found!"}
  }

}

//Remove note
var removeNote = (title) => {
  var notes = fetchNotes();
  var notesAfterRemoving = notes.filter(function(eachNote){
    return eachNote.noteTitle != title;
  });

  if(notes.length === notesAfterRemoving.length){
    return {"status":false, "message":"Note not found"};
  }else{
    saveNotes(notesAfterRemoving);
    return {"status":true, "message":`${title} removed successfully`,"note":notesAfterRemoving};
  }
}
//Remove all notes
var removeAll = ()=>{
  var notes = fetchNotes();
  notes=[];
  saveNotes(notes);
  return {"status":true,"message":"All notes removed successfully"};
}





//Export functions
module.exports = {
  addNote,
  getAllNotes,
  readNote,
  removeNote,
  printNotes,
  printOnConsole,
  removeAll
}
