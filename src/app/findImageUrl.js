export function findImageUrl(name) {
    console.log('correct answer name', name)
    function emptySpacesToUnderscore(name) {
        return `swapi-json-server/public/${name.split(' ').join('_')}.jpg`
    }
    return emptySpacesToUnderscore(name)
}