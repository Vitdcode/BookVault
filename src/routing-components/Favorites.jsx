import { useOutletContext } from "react-router-dom";
import AddToFavorites from "../functional-components/AddToFavorites";

const Favorites = () => {
  const { favorites } = useOutletContext();

  return (
    <div>
      {favorites.map((book) => (
        <div key={book.id}>
          <h2>{book.title}</h2>
          <img src={book.coverUrl} alt={book.title} />
          <AddToFavorites bookData={book} />
        </div>
      ))}
    </div>
  );
};
export default Favorites;
