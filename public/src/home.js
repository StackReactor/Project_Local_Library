function groupByKey(books, key) {
  return books.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
}
function _sortHelper(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}
function getTotalBooksCount(books) {
  // 10) should return the total number of books in the array
  // 11) should return zero if the array is empty
  return books.length;
}

function getTotalAccountsCount(accounts) {
  // 12) should return the total number of accounts in the array
  // 13) should return zero if the array is empty
  return accounts.length;
}

// 14) should return the total number of books that are currently borrowed
function getBooksBorrowedCount(books) {
  return books.filter((book) => {
    const [recent] = book.borrows;
    return !recent.returned;
  }).length;
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sorted = _sortHelper(count);
  return sorted.map((name) => ({ name, count: count[name] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, { id, borrows }) => {
    acc[id] = borrows.length;
    return acc;
  }, {});
  const sorted = _sortHelper(groupById);
  return sorted
    .map((id) => {
      const { title: name } = books.find(({ id: bookId }) => bookId === id);
      return { name, count: groupById[id] };
    })
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // 19) should return an ordered list of most popular authors
  // 20) should limit the list to the top five
  let returnArr = [];
  authors.forEach((author) => {
    returnArr.push({
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
      id: author.id,
    });
  });

  books.forEach((book) => {
    let foundAuthor = returnArr.find((author) => {
      return author.id === book.authorId;
    });
    foundAuthor.count += book.borrows.length;
  });

  return returnArr
    .sort((authorA, authorB) => authorB.count - authorA.count)
    .slice(0, 5)
    .map(({ id, ...rest }) => rest);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
