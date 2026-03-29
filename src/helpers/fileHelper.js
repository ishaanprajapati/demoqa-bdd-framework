const fs = require('fs');
const path = require('path');

class FileHelper {
    writeBookDetails(details, filename = 'book-details.txt') {
        const dir = path.join(process.cwd(), 'test-results');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const content = [
            'Book Details',
            '------------',
            `Title     : ${details.title     || 'N/A'}`,
            `Author    : ${details.author    || 'N/A'}`,
            `Publisher : ${details.publisher || 'N/A'}`,
            `Saved at  : ${new Date().toLocaleString()}`,
        ].join('\n');

        const filePath = path.join(dir, filename);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`[FILE] Written to: ${filePath}`);
        return filePath;
    }
}

module.exports = FileHelper;
