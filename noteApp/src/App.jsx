import React from "react";
import { useState } from "react";

const App = () => {


  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [editIndex, setEditIndex] = useState(null);
  const [task, setTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(details);

    const copyTask = [...task]
    // copyTask.push({ title, details })
    setTask(copyTask);
    // console.log(copyTask);

    if (editIndex !== null) {
      // update existing note
      copyTask[editIndex] = { title, details };
      setEditIndex(null);
    } else {
      // add new note
      copyTask.push({ title, details });
    }

    setTitle('')
    setDetails('')
  };

  const deleteNote = (idx) => {
    const copyTask = [...task]
    copyTask.splice(idx, 1)
    setTask(copyTask);
  }

  const editNote = (idx) => {
    setTitle(task[idx].title);
    setDetails(task[idx].details);
    setEditIndex(idx);
  };

  return (
    <div className="h-screen lg:flex bg-black text-white ">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex p-10 lg:w-1/2 flex-col items-start  gap-4"
      >
        <h1 className="text-3xl font-bold">Add Notes</h1>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full py-2 outline-none border-2 font-medium rounded"
        />
        <textarea
          value={details}
          onChange={(e) => {
            setDetails(e.target.value)
          }}
          type="text"
          placeholder="Write Details"
          className="px-5 w-full h-20 py-2 rounded border-2 font-medium outline-none"
        />
        <button
          className="bg-white w-full px-5 py-2 border-2 outline-none active:scale-95 font-medium rounded text-black"
        >
          Add Note
        </button>
      </form>
      <div className="p-10 bg-amber-500 lg:border-l-2 lg:w-1/2">
        <h1 className="text-3xl font-bold">Recent Notes</h1>
        <div className="flex flex-wrap items-start justify-start gap-5 mt-5 h-full overflow-auto">
          {task.map(function (elem, idx) {
            return <div key={idx}
              className="h-52 w-44 bg-cover flex flex-col justify-between items-start rounded-2xl bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] text-black p-4">
              <div>
                <h1 className="leading-tight underline text-xl font-bold">{elem.title}:-</h1>
                <p className="leading-tight font-light  px-2 text-gray-400">{elem.details}</p>
              </div>
              <div className="flex justify-between gap-5">
                <button
                  onClick={() => {
                    deleteNote(idx)
                  }}
                  className="px-3 cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white">Delete</button>
                <button
                  onClick={() => {
                    editNote(idx)
                  }}
                  className="px-3 cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white">Edit</button>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  );
};

export default App;
