import { useOutletContext } from "react-router-dom";
import groupBooks from "../reusable-components/groupBooks";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Statistics = () => {
  const { books } = useOutletContext();
  const groupedBooks = groupBooks(books);

  /*   const booksReadYears = () => {
    let booksCompleted = [];
    for (const key in groupedBooks) {
      let booksCompletedThisYear = {};
      if (!booksCompletedThisYear[key]) {
        booksCompletedThisYear[key] = groupedBooks[key].length;
        booksCompleted.push(booksCompletedThisYear);
      }
    }
    return booksCompleted;
  }; */

  const completedBooks = Object.entries(groupedBooks).map(([year, bookEntries]) => ({
    year: year,
    booksRead: bookEntries.length,
  }));
  console.log(completedBooks);
  if (books.length === 0) return;
  return (
    <div className=" mx-auto px-4 py-8 mt-30">
      <h1 className="text-3xl font-bold mb-8 text-center">Statistics</h1>
      <span>Completed books: </span>
      <BooksReadPerYearChart completedBooks={completedBooks} />
    </div>
  );
};

const BooksReadPerYearChart = ({ completedBooks }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Books Read per Year</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={completedBooks}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="booksRead" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
