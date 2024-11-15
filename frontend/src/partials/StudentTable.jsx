function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {Object.keys(students[0] || {}).map((key) => (
            <th key={key} className="border border-gray-300 px-4 py-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </th>
          ))}
          <th className="border border-gray-300 px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            {Object.values(student).map((value, i) => (
              <td key={i} className="border border-gray-300 px-4 py-2">
                {value}
              </td>
            ))}
            <td className="border border-gray-300 px-4 py-2">
              <button
                onClick={() => onEdit(index)}
                className="btn bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="btn bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
