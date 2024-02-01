import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "./data";

const ListByTopic = () => {
  const { topic } = useParams();
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await fetchArticlesByTopic(topic);
        setArticleList(articles);
      } catch (error) {
        console.error("Error fetching articles by topic:", error);
      }
    };
    fetchData();
  }, [topic]);

  return (
    <div
      style={{ marginTop: "100px", marginLeft: "50px", textAlign: "center" }}
    >
      <h3>{`Articles related to ${topic}`}</h3>
      {articleList.length > 0 ? (
        <ul>
          {articleList.map((article) => (
            <li key={article.id}>
              <Link to={`/showArticle/${article.title}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found for the topic.</p>
      )}
    </div>
  );
};

export default ListByTopic;
