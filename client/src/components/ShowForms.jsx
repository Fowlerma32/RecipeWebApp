import React, {useState} from 'react';


const ShowForms = ({forms, setForms, onUpdate, handleIngredientSearch}) =>{
  const [editModeId, setEditModeId] = useState(null);
  const [editableForm, setEditableForm] = useState({
    ingredients: "",
    ignorePantry: false,
    ranking: 2
});
  

  // Enter edit mode for a form
const startEditing = (form) => {
  setEditModeId(form.form_id);
  setEditableForm({
    ingredients: form.ingredient_list,
    ignorePantry: form.ignore_pantry,
    ranking: form.ranking
  });
};
  
// Handle saving
const saveChanges = async (id) => {
  try {
    const updatedForm = {
      ingredients: editableForm.ingredients,
      ignorePantry: editableForm.ignorePantry,
      ranking: editableForm.ranking,
    };
    await fetch(`http://localhost:5000/recipe/forms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedForm),
    });

    // Update the form with the edited data
    setForms(forms.map(form => 
      form.form_id === id ? { ...form, ...updatedForm } : form
    ));
      
    // Exit edit mode
    setEditModeId(null);
    onUpdate();

  } catch (error) {
    console.log(error);
  }
};

const deleteForm = async (id) => {
  try {
    const deleteForm = await fetch(`http://localhost:5000/recipe/forms/${id}`, {
      method: "DELETE"
    });

    setForms(forms.filter(form=>form.form_id !== id));
  
  } catch (error) {
    console.log(error);
  }
}

return(
  <div className="table-container">
    <h2>All Submitted Forms</h2>
    {forms.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Form Number</th>
            <th>Ingredients</th>
            <th>Ignore Pantry</th>
            <th>Ranking</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Search Using This Form!</th>
          </tr>
        </thead>
        <tbody>
          {forms.map(form => (
            <tr key = {form.form_id}>
                <td>{form.user_id}</td>
                <td>{form.form_id}</td>
                <td>
                {editModeId === form.form_id ? (
                  <input 
                  type="text" 
                  value={editableForm.ingredients} 
                  onChange={(e) => setEditableForm({...editableForm, ingredients: e.target.value})} 
                  />
                ) : (
                  form.ingredient_list
                )}
                </td>
                <td>
                {editModeId === form.form_id ? (
                  <input 
                    type="checkbox" 
                    checked={editableForm.ignorePantry} 
                    onChange={(e) => setEditableForm({...editableForm, ignorePantry: e.target.checked})} 
                  />
                ) : (
                  form.ignore_pantry ? "Yes" : "No"
                )}
                </td>
                <td>
                {editModeId === form.form_id ? (
                  <select 
                    value={editableForm.ranking} 
                  onChange={(e) => setEditableForm({...editableForm, ranking: e.target.value})}
                  >
                    <option value={1}>Maximize Used Ingredients</option>
                    <option value={2}>Minimize Missing Ingredients</option>
                  </select>
                ) : (
                  form.ranking === 1 ? "Maximize Used Ingredients" : "Minimize Missing Ingredients"
                )}
                </td>
                <td>
                {editModeId === form.form_id ? (
                  <button className="edit-button" onClick={() => saveChanges(form.form_id)}>Save</button>
                ) : (
                  <button className="edit-button" onClick={() => startEditing(form)}>Edit</button>
                )}
                </td>
                <td><button className="delete-button" onClick={() => deleteForm(form.form_id)}> Delete</button></td>
                <td><button className="search-button" onClick={() => handleIngredientSearch(form)}>Search</button></td>
              </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No forms have been submitted yet.</p>
    )}
  </div>
);
};

export default ShowForms;