import React from 'react';


const ShowForms = ({forms, setForms}) =>{

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
    <div>
      <h2>All Submitted Forms</h2>
      {forms.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Form Number</th>
              <th>Ingredients</th>
              <th>Include Pantry</th>
              <th>Ranking</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(form => (
              <tr key = {form.form_id}>
                  <td>{form.user_id}</td>
                  <td>{form.form_id}</td>
                  <td>{form.ingredient_list}</td>
                  <td>{form.ignore_pantry ? "Yes" : "No"}</td>
                  <td>{form.ranking === 1 ? "Maximize Used Ingredients" : "Minimize Missing Ingredients"}</td>
                  <td>Edit</td>
                  <td><button onClick={() => deleteForm(form.form_id)}> Delete</button></td>
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