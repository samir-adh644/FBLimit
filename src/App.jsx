import React, { useState, useEffect } from 'react';

export default function App() {
  const [boxes, setBoxes] = useState(() => {
    const saved = localStorage.getItem("my_boxes");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ name: "", url: "" });

  useEffect(() => {
    localStorage.setItem("my_boxes", JSON.stringify(boxes));
  }, [boxes]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (formData.name && formData.url) {
      setBoxes([...boxes, formData]);
      setFormData({ name: "", url: "" });
    }
  };

  // --- DELETE FUNCTION ---
  const deleteBox = (indexToDelete) => {
    const updatedBoxes = boxes.filter((_, index) => index !== indexToDelete);
    setBoxes(updatedBoxes);
  };

  return (
    <div className="p-10">
      <form onSubmit={handleCreate} className="mb-10">
        <input 
          className="border p-2 mr-2" 
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          className="border p-2 mr-2" 
          placeholder="URL"
          value={formData.url}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Create</button>
      </form>

      <div className="flex flex-wrap gap-6">
        {boxes.map((box, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* The Link Box */}
            <a 
              href={box.url} 
              target="_blank" 
              className="w-32 h-32 bg-blue-300 flex items-center justify-center rounded-lg shadow-md hover:bg-blue-400 transition"
            >
              {box.name}
            </a>

            {/* The Delete Button */}
            <button 
              onClick={() => deleteBox(index)} 
              className="mt-2 text-red-500 hover:text-red-700 text-sm font-bold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


