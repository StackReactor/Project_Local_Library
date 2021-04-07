function findAccountById(accounts, id) {
  // 1) should return the account object when given a particular ID
  return accounts.find((accounts) => accounts.id === id);
}
function sortAccountsByLastName(accounts) {
/*  2) should return the list of accounts ordered by last name
  const mapNamesA = accountsA .name.last);
  mapNames.sort((namesA, namesB) => (namesA.name.last = namesB.name.last));
*/
  return accounts.sort((accountA, accountB) => {
    const last1 = accountA.name.last.toLowerCase();
    const last2 = accountB.name.last.toLowerCase();
    return last1 > last2 ? 1 : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  // 3) should return the number of times an account has created a 'borrow' record
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);
    return acc + count;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  /*
  4) should return all of the books taken out by an account with the author embedded
  1. filter for books that haven't been returned
  2. filter those books for borrowed by account
*/
  let booksTaken = [];
  books.forEach((book) => {
    if (book.borrows.find((item) => item.id === account.id && !item.returned)) {
      booksTaken.push(book);
    }
  });
  console.log(booksTaken);
  booksTaken.forEach((book) => {
    let authorName = authors.find((user) => user.id === book.authorId);
    book["author"] = authorName;
  });
  console.log(booksTaken);
  return booksTaken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
