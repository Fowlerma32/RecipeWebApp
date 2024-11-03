import React, {useState} from 'react';


const ShowForms = ({forms, setForms, onUpdate, handleIngredientSearch}) =>{
  const [editModeId, setEditModeId] = useState(null);
  const [editableForm, setEditableForm] = useState({
    searchTerm: "",
    cuisine: "",
    includeIngredients: "",
    ignorePantry: false,
    sort: ""
});

  // Enter edit mode for a form
const startEditing = (form) => {
  setEditModeId(form.form_id);
  setEditableForm({
    searchTerm: form.query,
    cuisine: form.cuisine,
    includeIngredients: form.ingredient_list,
    ignorePantry: form.ignore_pantry,
    sort: form.sort
  });
};
  
// Handle saving
const saveChanges = async (id) => {
  try {
    const updatedForm = {
      searchTerm: editableForm.searchTerm,
      cuisine: editableForm.cuisine,
      includeIngredients: editableForm.includeIngredients,
      ignorePantry: editableForm.ignorePantry,
      sort: editableForm.sort
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
            <th>Search Term</th>
            <th>Cuisine</th>
            <th>Ingredients</th>
            <th>Ignore Pantry</th>
            <th>sort</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Search Using This Form!</th>
          </tr>
        </thead>
        <tbody>
          {forms.sort((a, b) => a.form_id - b.form_id).map(form => (
            <tr key = {form.form_id}>
                <td>{form.user_id}</td>
                <td>{form.form_id}</td>
                <td>
                {editModeId === form.form_id ? (
                  <input 
                  type="text" 
                  value={editableForm.searchTerm} 
                  onChange={(e) => setEditableForm({...editableForm, searchTerm: e.target.value})} 
                  />
                ) : (
                  form.query
                )}
                </td>
                <td>
                {editModeId === form.form_id ? (
                  <select 
                    value={editableForm.cuisine} 
                    onChange={(e) => setEditableForm({...editableForm, cuisine: e.target.value})}
                  >
                    <option value="">Select a Cuisine</option>
                    <option value="African">African</option>
                    <option value="Asian">Asian</option>
                    <option value="American">American</option>
                    <option value="Indian">Indian</option>
                    <option value="Italian">Italian</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Mexican">Mexican</option>
                    <option value="Nordic">Nordic</option>
                    <option value="Thai">Thai</option>
                  </select>
                ) : (
                  form.cuisine
                )}
                </td>
                <td>
                {editModeId === form.form_id ? (
                  <input 
                  type="text" 
                  value={editableForm.includeIngredients} 
                  onChange={(e) => setEditableForm({...editableForm, includeIngredients: e.target.value})} 
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
                    value={editableForm.sort} 
                  onChange={(e) => setEditableForm({...editableForm, sort: e.target.value})}
                  >
                    <option value={"max-used-ingredients"}>Maximize Used Ingredients</option>
                    <option value={"min-missing-ingredients"}>Minimize Missing Ingredients</option>
                  </select>
                ) : (
                  form.sort === "max-used-ingredients" ? "Maximize Used Ingredients" : "Minimize Missing Ingredients"
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