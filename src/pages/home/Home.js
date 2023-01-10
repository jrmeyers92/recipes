import { useFetch } from "../../hooks/useFetch";

// components
import RecipeList from "../../components/RecipeList";

// styles
import "./Home.css";

const Home = () => {
  const { data, isPending, error } = useFetch("http://localhost:3000/recipes");
  console.log(data);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
