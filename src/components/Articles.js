import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ArticleCard } from "./ArticleCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import articleImg1 from "../assets/img/article-img-01.jpg";
import articleImg2 from "../assets/img/article-img-02.jpg";
import articleImg3 from "../assets/img/article-img-03.jpg";
import articleImg4 from "../assets/img/article-img-04.jpg";
import articleImg5 from "../assets/img/article-img-05.jpg";
import articleImg6 from "../assets/img/article-img-06.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";

export const Articles = () => {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearch = () => {
    console.log(searchTitle);
    navigate(`/listByTitle/${searchTitle}`);
  };

  const articles = [
    {
      topic: "Art",
      imgUrl: articleImg1,
    },
    {
      topic: "History",
      imgUrl: articleImg2,
    },
    {
      topic: "News",
      imgUrl: articleImg3,
    },
    {
      topic: "Fiction",
      imgUrl: articleImg4,
    },
    {
      topic: "Sport",
      imgUrl: articleImg5,
    },
    {
      topic: "Movie",
      imgUrl: articleImg6,
    },
  ];

  return (
    <section className="article" id="articles">
      <Container>
        <Row>
          <Col size={12}>
            <h2>Topics</h2>
            <p>Welcome to the newest blog.</p>
            <form
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "50px",
                textAlign: "center",
                borderRadius: "8px",
                overflow: "hidden",
                color: "white",
              }}
            >
              <input
                type="text"
                placeholder="Search articles by title..."
                onChange={(e) => setSearchTitle(e.target.value)}
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  marginRight: "5px",
                  width: "300px",
                }}
              />
              <button
                type="button"
                onClick={handleSearch}
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  border: "none",
                  borderRadius: "8px",
                  marginRight: "5px",
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Search
              </button>
            </form>

            <Row>
              {articles.map((article, index) => (
                <ArticleCard key={index} {...article} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
