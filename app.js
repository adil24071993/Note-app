const fs = require('fs');
const _ = require('lodash'); //naming convention
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs
.command('add','Add a new note',{
  title:{
    describe: 'Title of the note',
    demand: true,
    alias: 't'
  },
  body:{
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
  }
})
.command('list','List all notes')
.command('read','Read new note',{
  title:{
    describe: 'Title of the note',
    demand: true,
    alias: 't'
  }
})
.command('remove','Remove a note',{
  title:{
    describe: 'Title of the note',
    demand: true,
    alias: 't'
  }
})
.command('removeall', 'Remove all notes')
.help('help', 'h')
.argv;


var command = argv._[0].toLowerCase();

var printMessage = function(message){
  console.log(message);
}

printMessage(`Command: ${command}`);


if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note.status){
    printMessage(`${note.noteTitle} successfully created`);
    notes.printOnConsole(note);
  }else{
    printMessage(`${note.noteTitle} note already exist`);
  }
}else if(command === 'list'){
  var notesList = notes.getAllNotes();
  if(notesList.length){
      notes.printNotes(notesList);
  }else{
    printMessage("No notes found! Create new note with 'add' command");
  }
}else if (command === 'read') {
  var note = notes.readNote(argv.title);
  if(note.status){
    notes.printNotes(note.note);
  }else{
    printMessage(note.message);
  }
}else if (command === 'remove') {
  var note = notes.removeNote(argv.title);
  printMessage(note.message);
  var notesList = notes.getAllNotes();
  if(notesList.length){
      notes.printNotes(notesList);
  }else{
    printMessage("No notes found! Create new note with 'add' command");
  }
}else if(command === 'removeall'){
  var note = notes.removeAll();
  printMessage(note.message);
}else{
  printMessage('Command not recognized');
}
