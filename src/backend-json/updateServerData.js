const updateServerData = (books) => {
  if (books.length === 0) return;
  try {
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ books: books }),
    });
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export const updateTheme = (theme) => {
  try {
    fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: theme }),
    });
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }
};

export default updateServerData;
