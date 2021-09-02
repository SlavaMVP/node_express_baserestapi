import { Link } from "react-router-dom";

export default function Order(props) {
  //console.log(props);
  return (
    <tr>
      <td>
        <Link to={`/user/order/${props.item.id}`}>Order #{props.idx}</Link>
      </td>
      <td>{props.item.status}</td>
      <td>{props.item.payment}</td>
      <td>{props.item.shipping}</td>
      <td>{props.item.price}</td>
      <td>{new Date(props.item.date).toLocaleDateString()}</td>
    </tr>
  );
}
