import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const ArticleCard = ({ topic, imgUrl }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/listByTopic/${topic}`);
  };

  return (
    <Col
      size={12}
      sm={6}
      md={4}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="article-imgbx">
        <img src={imgUrl} alt={topic} />
        <div className="article-txtx">
          <h4>{topic}</h4>
        </div>
      </div>
    </Col>
  );
};

export default ArticleCard;
