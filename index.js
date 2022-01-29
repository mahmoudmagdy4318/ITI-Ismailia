const fs = require('fs');
const { program } = require('commander');

// const [,,username,age] =process.argv;

// console.log(`my name is ${username} and i am ${age}`);

// ==> take data from args
// ==> push to data array
// ==> write the new data file 

const addElement = ({username,age}) =>{
    const db = fs.readFileSync('./db.json',{
        encoding : 'utf8'
    }) ;
        
    const dbJson = JSON.parse(db);
    
    dbJson.push({
        id: Date.now(),
        username,
        age
    })
    
    fs.writeFileSync('./db.json', JSON.stringify(dbJson, null, 2));    
} 

const listData = () =>{
    const db = fs.readFileSync('./db.json', {
        encoding : 'utf8'
    });
        
    const dbJson = JSON.parse(db);

    console.log({ dbJson });
}

// const [,,action,username,age] = process.argv;

// switch (action) {
//     case 'add':
//         addElement({username, age});
//         break;
//     case 'list':
//         listData();
//         break;    
//     default:
//         throw new Error('not implemented')
// }

program
    .command('add')
    .description('add a new element to database')
    .option('-u, --username <string>', 'username of user')
    .option('-a, --age <number>', 'age of user')
    .action(addElement)

program
    .command('list')
    .description('list elements of database')
    .action(listData);

program.parse(process.argv);
