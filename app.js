const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');
const { argv } = require('yargs');

// Creating add Command

yargs.command({
    command : "add",
    describe : "Add a New Note!",
    builder : {
        title : {
            describe : 'Note Title',
            demandOption : true, 
            type : 'string',
        },
        body: {
            describe : "Body of the note",
            demandOption : true,
            type :'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

// Creating Remove command

yargs.command({
    command : "remove",
    describe : "Remove a Note!",
    builder :{
        title : {
            describe: 'Note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

// Creating list command

yargs.command({
    command : "list",
    describe : "List your Notes!",
    handler() {
        notes.listNotes()
    }
})

// Creating Read Command

yargs.command({
    command : "read",
    describe : "Read a Note!",
    builder : {
        title : {
            describe : "Read Note",
            demandOption : true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();