import AddToFavorites from "../functional-components/AddToFavorites";
import GenericDesign from "../reusable-components/GenericDesign";

const Favorites = () => {
  return (
    <>
      <GenericDesign
        title="Favorite Books"
        renderIcon={(book) => <AddToFavorites bookData={book} />}
        searchTerm={"isFavorite"}
      />
    </>
  );
};

export default Favorites;
