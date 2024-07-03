import classes from "./style.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ElementCard from "./components/element-card/ElementCard";
import { useParams } from "react-router-dom";

const ListContentPage = () => {
  const { searchedList } = useParams(); // Get listId from URL
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // FETCH ITEMS FROM THE LIST
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2000/api/v1/lists/${searchedList}`
        );
        setItems(response.data.data.list.titles);
      } catch (err) {
        console.error(`Failed to fetch list items. Error message: ${err}`);
        setError(`Failed to fetch list items. Error message: ${err}`);
      }
    };
    fetchItems();
  }, []); // Empty dependency array ensures the effect runs only once

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={classes.listBody}>
      <main className={classes["content-grid"]}>
        {items.map((element, index) => (
          <ElementCard key={index} element={element} />
        ))}
      </main>
    </div>
  );
};

export default ListContentPage;
