import classes from "./Card.module.css";

// creating a resuseable card container
function Card(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default Card;
