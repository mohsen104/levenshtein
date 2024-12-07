// تابعی برای محاسبه فاصله Levenshtein
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

// تابعی برای پیدا کردن نزدیک‌ترین کلمه
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

    // بررسی فاصله با آستانه
    return closestDistance <= threshold ? closestWord : null;
}

// آرایه‌ای از کلمات صحیح
const correctWords = ['کتاب', 'موبایل', 'کامپیوتر', 'سیستم', 'برنامه نویسی'];

// ورودی کاربر
const userInput = 'کتب'; // ورودی اشتباه کاربر

// پیدا کردن نزدیک‌ترین کلمه
const suggestion = findClosestWord(userInput, correctWords,8);

if (suggestion) {
    console.log(`شاید منظورتون "${suggestion}" بوده.`);
} else {
    console.log('کلمه‌ای یافت نشد.');
}
