export function findImageUrl(mode, idx) {
    console.log('index', idx)
    function emptySpacesToUnderscore(name) {
        return `/static/img/modes/${mode}/${idx}.jpg`
    }
    return emptySpacesToUnderscore(name)
}