const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) =>{
    const notes = loadNotes ();
    const duplicateNote = notes.find((note) => note.title === title); 
    
    if (!duplicateNote) {
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("New Note added"));
    }else {
        console.log(chalk.red.inverse("Note Title taken"));
    }
}

const removeNotes = (title) => {
    const notes = loadNotes ();
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title;
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse("Note Removed!"));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse("No Note found!"))
    }

    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'))
    notes.forEach((note)=> {
        console.log(note.title);
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title); 

    if (note) {
        console.log(chalk.inverse (note.title));
        console.log(note.body);
    } else {
        console.log(chalk.inverse.red("Note Not Found"));
    }
}




const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync ('notes.json', dataJson)
    
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const data = dataBuffer.toString();
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

module.exports = {
    addNotes : addNotes, 
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNote : readNote
}