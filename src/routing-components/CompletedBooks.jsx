import CompletedStatus from "../functional-components/CompletedStatus";
import GenericDesign from "../reusable-components/GenericDesign";

const CompletedBooks = () => {
  return (
    <GenericDesign
      title="Completed Books"
      renderIcon={(book) => <CompletedStatus bookData={book} />}
      searchTerm="isCompleted"
    />
  );
};

export default CompletedBooks;
