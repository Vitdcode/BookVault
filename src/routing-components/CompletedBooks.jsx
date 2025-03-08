import { useOutletContext } from "react-router-dom";
import CompletedStatus from "../functional-components/CompletedStatus";
import GenericDesign from "../reusable-components/GenericDesign";

const CompletedBooks = () => {
  const { completedBooks } = useOutletContext();

  return (
    <GenericDesign
      array={completedBooks}
      title="Completed Books"
      renderIcon={(book) => <CompletedStatus bookData={book} />}
    />
  );
};

export default CompletedBooks;
