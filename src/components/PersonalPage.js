import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const PersonalPage = () => {
  const { username } = useParams();
  const [articleList, setArticleList] = useState([]);
  const [status, setStatus] = useState({ success: false, message: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/personalPage/${username}`
        );
        const result = await response.json();

        if (response.ok) {
          setArticleList(result);
          setStatus({
            success: true,
            message: "Articles fetched successfully",
          });
        } else {
          console.log(result);
          setStatus({
            success: false,
            message: "Something went wrong, please try again later.",
          });
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setStatus({
          success: false,
          message: "Something went wrong, please try again later.",
        });
      }
    };

    fetchArticles();
  }, [username]);

  const handleUpdate = (articleId) => {
    navigate(`/update-article/${username}/${articleId}`);
  };

  const handleDelete = async (articleId) => {
    try {
      const response = await fetch(
        `http://localhost:5005/deleteArticle/${articleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setArticleList((prevArticles) =>
          prevArticles.filter((article) => article.id !== articleId)
        );
        setStatus({
          success: true,
          message: "Article deleted successfully",
        });
      } else {
        console.log(result);
        setStatus({
          success: false,
          message: "Something went wrong while deleting the article.",
        });
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      setStatus({
        success: false,
        message: "Something went wrong while deleting the article.",
      });
    }
  };

  return (
    <div style={{ marginTop: "100px", marginLeft: "50px" }}>
      <h3>Personal Article List</h3>
      {articleList.length > 0 ? (
        <ul>
          {articleList.map((article) => (
            <li key={article.id}>
              <Button
                style={{
                  marginTop: "20px",
                  marginRight: "20px",
                  marginBottom: "20px",
                  textAlign: "right",
                }}
                onClick={() => handleUpdate(article.id)}
              >
                Edit
              </Button>
              <Button
                style={{
                  marginTop: "20px",
                  marginRight: "50px",
                  marginBottom: "20px",
                  textAlign: "right",
                }}
                onClick={() => handleDelete(article.id)}
              >
                Delete
              </Button>
              <span
                style={{
                  marginRight: "50px",
                  width: "600px",
                }}
              >
                Topic:[{article.topic}]
              </span>
              <Link to={`/showArticle/${article.title}`}>{article.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found for the author.</p>
      )}
    </div>
  );
};

export default PersonalPage;
