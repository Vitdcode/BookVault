import { useOutletContext } from "react-router-dom";
import AddToBookmarks from "../functional-components/AddToBookmarks";
import GenericDesign from "../reusable-components/GenericDesign";

const Bookmarks = () => {
  const { bookmarks } = useOutletContext();

  return (
    <>
      <GenericDesign
        array={bookmarks}
        title="Bookmarks"
        renderIcon={(book) => <AddToBookmarks bookData={book} />}
      />
    </>
  );
};

export default Bookmarks;
