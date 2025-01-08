// Function to calculate the Levenshtein distance
function levenshtein(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    )
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// Function to find the closest word
function findClosestWord(input, words, threshold = 5) {
    let closestWord = '';
    let closestDistance = Infinity;

    words.forEach(word => {
        const distance = levenshtein(input, word);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestWord = word;
        }
    });

    // Check the distance against the threshold
    return closestDistance <= threshold ? closestWord : null;
}

// Array of correct words
const correctWords = ['book', 'mobile', 'computer', 'system', 'programming'];

// User input
const userInput = 'bok'; // User's incorrect input

// Find the closest word
const suggestion = findClosestWord(userInput, correctWords, 8);

if (suggestion) {
    console.log(`Did you mean "${suggestion}"?`);
} else {
    console.log('No matching word found.');
}
