import Quality from './quality'
import Bookmark from './bookmark'

const User = ({ _id, name, profession, qualities, completedMeetings, rate, bookmark, ...rest }) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Quality key={quality._id} color={quality.color} name={quality.name} _id={quality._id} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate} /5</td>
      <td>
        <Bookmark status={bookmark} onToggle={rest.onToggle} _id={_id}/>
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => rest.onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  )
}

export default User
