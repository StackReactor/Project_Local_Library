function findAuthorById(authors, id) {
  // 5) should return the author object when given a particular ID
  return authors.find((authors) => authors.id === id);
}

function findBookById(books, id) {
  // 6) should return the book object when given a particular ID
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // 7) should return an array with two arrays: borrowed books and returned books
  return books.reduce(
    (acc, book) => {
      const [borrowed, returned] = acc;
      const recent = book.borrows[0];
      if (recent.returned) {
        returned.push(book);
      } else {
        borrowed.push(book);
      }
      return acc;
    },
    [[], []]
  );
}

function getBorrowersForBook(book, accounts) {
  // 8) should return an array for a book of all borrowers with their information and return status
  // 9) should limit the list to ten borrowers
  const { borrows } = book;
  const borrowers = borrows.map(({ id, returned }) => {
    const account = accounts.find((account) => account.id === id);
    return {
      ...account,
      returned,
    };
  });
  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
