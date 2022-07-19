const formatName = (name) => {
    let parts = name.trim().split(" ");
    parts.forEach( (part, index) => {
        part = part.toLowerCase();
        let beginChar = part.at(0).toUpperCase();
        parts[index] =  beginChar + part.slice(1);
    });
    return parts.join(" ").trim();
}

module.exports = { formatName }