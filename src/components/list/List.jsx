/* eslint-disable react/prop-types */

// import { listData } from '../../lib/dummyData'
import Card from '../card/Card'
import './List.scss'

const List = ({ posts }) => {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List