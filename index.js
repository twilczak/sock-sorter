const input = process.argv.slice(2)

console.log(sortSocks(input));

function sortSocks(input) {
    const groups = groupSocks(input);
    const pairs = pairSocks(groups);
    return listPairs(pairs);
}

function groupSocks(input) {
    const result = {}

    input.forEach((sock) => {
        !result[sock]
            ? result[sock] = 1
            : result[sock]++;
    });

    return result;
}

function pairSocks(groupedSocks) {
    const sockPairs = {};

    const sockGroups = Object.keys(groupedSocks);
    sockGroups.forEach(sockGroup => {
        const pairCount = Math.floor(groupedSocks[sockGroup] / 2);
        if( pairCount ) {
            sockPairs[sockGroup] = pairCount;
        }
    });

    return sockPairs;
}

function listPairs(sockPairs) {
    const sockGroups = Object.keys(sockPairs);
    const pairCount = sockGroups.reduce((previousPairCount, sockGroup) => sockPairs[sockGroup] + previousPairCount, 0);

    return pairCount < 1
        ? "No Pairs" :
        sockGroups.map(listPair(sockPairs)).join(", ");
}

function listPair(sockPairs) {
    return (sockType) => {
        const pairCount = sockPairs[sockType];
        const pairText = pairCount === 1 ? "pair" : "pairs"
        return `${sockType}: ${pairCount} ${pairText}`;
    }
}
