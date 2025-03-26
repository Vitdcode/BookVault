import { useOutletContext } from "react-router-dom";
import groupBooks from "../reusable-components/groupBooks";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaBook } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";

const Statistics = () => {
  const { books, booksRead } = useOutletContext();
  const groupedBooks = groupBooks(books);

  const completedBooks = Object.entries(groupedBooks).map(([year, bookEntries]) => ({
    year: year,
    booksRead: bookEntries.length,
  }));

  if (books.length === 0) return;

  return (
    <div className="px-4 py-8 mt-5 md:w-[30%] w-[100%]">
      <h1 className="text-3xl font-bold mb-8 text-center">Statistics</h1>
      <div className="flex flex-col gap-5 items-start w-[100%]">
        <div className=" flex items-center justify-around gap-5 bg-base-200 p-4 rounded-lg  w-[100%]">
          <FaBook color="rgb(136, 132, 216)" size={30} className="my-auto" />
          <div className="flex flex-col ">
            <span className="grid grid-cols-1 text-lg ">Read books this year</span>
            <span className="font-bold text-lg text-center">{booksRead.booksReadThisYear}</span>
          </div>
        </div>
        <div className="flex items-center justify-around gap-5 bg-base-200 p-4 rounded-lg w-[100%] ">
          <FaBook color="rgb(136, 132, 216)" size={30} className="my-auto" />
          <div className="flex flex-col ">
            <span className="grid grid-cols-1 text-lg ">Read books total</span>
            <span className="font-bold text-lg text-center">{booksRead.booksReadAllYear}</span>
          </div>
        </div>
        <div className=" flex items-center justify-around gap-5 bg-base-200 p-4 rounded-lg w-[100%] ">
          <IoBookSharp color="rgb(136, 132, 216)" size={30} className="my-auto" />
          <div className="flex flex-col ">
            <span className="grid grid-cols-1 text-lg ">Total pages read</span>
            <span className="font-bold text-lg text-center">{booksRead.pagesReadCount}</span>
          </div>
        </div>
        <BooksReadPerYearChart completedBooks={completedBooks} />
      </div>
    </div>
  );
};

const BooksReadPerYearChart = ({ completedBooks }) => {
  return (
    <div className="bg-base-200 p-4 rounded-lg w-[100%]">
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
