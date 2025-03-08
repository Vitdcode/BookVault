import { useOutletContext } from "react-router-dom";
import AddToFavorites from "../functional-components/AddToFavorites";
import GenericDesign from "../reusable-components/GenericDesign";

const Favorites = () => {
  const { favorites } = useOutletContext();

  return (
    <>
      <GenericDesign
        array={favorites}
        title="Favorite Books"
        renderIcon={(book) => <AddToFavorites bookData={book} />}
      />
    </>
  );
};

export default Favorites;
