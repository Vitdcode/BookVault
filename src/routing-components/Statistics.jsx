import { useOutletContext } from "react-router-dom";
import groupBooks from "../reusable-components/groupBooks";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaBook } from "react-icons/fa";

const Statistics = () => {
  const { books, booksRead } = useOutletContext();
  const groupedBooks = groupBooks(books);

  const completedBooks = Object.entries(groupedBooks).map(([year, bookEntries]) => ({
    year: year,
    booksRead: bookEntries.length,
  }));

  if (books.length === 0) return;

  return (
    <div className="flex flex-col gap-10 px-4 py-8 mt-30">
      <h1 className="text-3xl font-bold mb-8 text-center">Statistics</h1>
      <div className=" mx-auto flex items-center gap-5 bg-base-200 p-4 rounded-lg max-w-[200px] ">
        <FaBook color="rgb(136, 132, 216)" size={30} className="my-auto" />
        <div className="flex flex-col ">
          <span className="grid grid-cols-1 text-lg ">Read books this year</span>
          <span className="font-bold text-lg">{booksRead.booksReadThisYear}</span>
        </div>
      </div>
      <div className=" mx-auto flex items-center gap-5 bg-base-200 p-4 rounded-lg max-w-[200px] ">
        <FaBook color="rgb(136, 132, 216)" size={30} className="my-auto" />
        <div className="flex flex-col ">
          <span className="grid grid-cols-1 text-lg ">Read books total</span>
          <span className="font-bold text-lg">{booksRead.booksReadAllYear}</span>
        </div>
      </div>
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
