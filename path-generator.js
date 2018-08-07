const existingList = [];
const repeatCountMap = {};
const generatedPaths = {}

module.exports = function pathGenerator(identifier, prefix, name) {
    if(generatedPaths[identifier]) {
        return generatedPaths[identifier];
    }
    const parsedName = name ? prefix + "/" + name.trim().replace(/\s+/g, "-").toLowerCase() : prefix;
    let output;
    if (existingList.includes(parsedName)) {
        const repeatCount = repeatCountMap[parsedName] = (repeatCountMap[parsedName] || 0) + 1;
        output = `${parsedName}-${repeatCount}`
    } else {
        existingList.push(parsedName);
        output = parsedName;
    }
    generatedPaths[identifier] = output;
    return output;
}