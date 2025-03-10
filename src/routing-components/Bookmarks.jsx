import AddToBookmarks from "../functional-components/AddToBookmarks";
import GenericDesign from "../reusable-components/GenericDesign";

const Bookmarks = () => {
  return (
    <>
      <GenericDesign
        title="Bookmarks"
        renderIcon={(book) => <AddToBookmarks bookData={book} />}
        searchTerm="isBookmarked"
      />
    </>
  );
};

export default Bookmarks;
