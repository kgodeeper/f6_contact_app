const fs = require('fs');

// lưu dữ liệu vào db.json
const saveData = (autoIncrement, list, dbPath) => {
    let status = {isDone: null, error: null};
    try{
        let contacts = JSON.stringify({autoIncrement, list});
        fs.writeFileSync(dbPath, contacts);
        status.isDone = true;
    }catch (err) {
       status.isDone = false;
       status.error = err;
    }
    return status;
}

// lấy dữ liệu ra từ db.json
const getData = (dbPath) => {
    let status = {isDone: null, error: null, data: null};
    try{
        let contacts = fs.readFileSync(dbPath, {encoding: "utf-8"});
        status.data = JSON.parse(contacts);
    }catch (err) {
        status.isDone = false;
        status.error = err;
    }
    return status;
}

module.exports = {
    saveData,
    getData
}