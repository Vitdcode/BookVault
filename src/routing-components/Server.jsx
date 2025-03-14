/* import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Server = () => {
  useEffect(() => {
    const url = "/api";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setJsonBooks(data.map((b) => b.book));
      });
  }, []);

  return (
    <div>
      {jsonBooks.map((b) => (
        <h1 key={b}>{b}</h1>
      ))}
    </div>
  );
};

export default Server;
 */
