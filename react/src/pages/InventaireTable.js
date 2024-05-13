import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import '../index.css';
/*
il n y a pas const [inventaires, setInventaires] = useState([]);
quand on modifie setInventaires, inventaire modifie automayiquement,
c est la raison pour la quelle en ligne 114 , on ecrit inventaires.
*/

const fetchInventaires = async (setInventaires) => {
  try {
    const response = await axios.get('http://localhost:8080/api/toutInventaires');
    // si data est vide, il arret de erreur
    if (Array.isArray(response.data)) {
      setInventaires(response.data);
    } else {
      console.error('Error fetching inventaires: Data is not an array');
    }
  } catch (error) {
    console.error('Error fetching inventaires:', error);
  }
};

const InventaireTable = () => {
  const [inventaires, setInventaires] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [modifiedValues, setModifiedValues] = useState({});

  /*
   1-Les données sont téléchargées depuis le backend dès que nous travaillons sur la même page.
   2-Toutes les 5 secondes, cette fonction effectue une mise à jour.
   3-Pour éviter les fuites de données, lorsque nous fermons la page, elle s'arrête automatiquement.
*/
  useEffect(() => {
    fetchInventaires(setInventaires);
    const interval = setInterval(() => fetchInventaires(setInventaires), 5000);
    return () => clearInterval(interval);
  }, []);
 // pour supprimer (button rouge)
  const handleDelete = async (codeinventaire) => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/delete/${codeinventaire}`);
      setInventaires(inventaires.filter(item => item.codeinventaire !== codeinventaire));
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const handleModify = (row) => {
    setSelectedRow(row.original);
    setModifiedValues(row.original);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedRow(null);
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedValues({ ...modifiedValues, [name]: value });
  };
// pour modifier (button blue)
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/inventory/modify/${selectedRow.codeinventaire}`, modifiedValues);
      setShowPopup(false);
      // Rafraîchir les données après la soumission de l'information.
      fetchInventaires(setInventaires);
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const columns = React.useMemo(() => [
    { Header: 'row', accessor: (_, index) => index + 1 },
    { Header: 'Code Inventaire', accessor: 'codeinventaire' },
    { Header: 'Pays', accessor: 'pays' },
    { Header: 'Image', accessor: 'image', Cell: ({ value }) => <img src={`/images/${value}`} alt="inventory" style={{ width: '70px', height: '50px' }} /> }, 
    { Header: 'Date', accessor: 'date' },
    { Header: 'Type', accessor: 'type' },
    { Header: 'Prix', accessor: 'prix' },
    { Header: 'Action', accessor: 'action', Cell: ({ row }) => (
      <>
        <button className="delete-button" onClick={() => handleDelete(row.original.codeinventaire)}>Delete</button>&nbsp;
        <button className="modify-button" onClick={() => handleModify(row)}>Modify</button>
      </>
    ) },
  ], []);
  
/*
Nous faisons appel à la bibliothèque React-Table,
ce qui nous permet de gérer la pagination plus 
facilement.
*/
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data: inventaires,
      initialState: { pageIndex, pageSize: 5 },
    },
    usePagination
  );

  return (
    <div>
      {inventaires.length > 0 ? (
        <table className="inventaire-table" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>Table is empty</div>
      )}
      <div>
      <br/>
        <button onClick={() => { if (canPreviousPage) { previousPage(); setPageIndex(pageIndex - 1); } }} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => { if (canNextPage) { nextPage(); setPageIndex(pageIndex + 1); } }} disabled={!canNextPage}>
          Next
        </button>
        <div>
          Page{' '}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
      </div>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-window">
            <div className="popup-header">
              <button className="close-button" onClick={handleClosePopup}>close ✕</button>
            </div>
            <table className="popup-table">
              <tbody>
                {selectedRow && Object.entries(selectedRow).map(([key, value]) => (
                  key !== 'id' && (
                    <tr key={key}>
                      <td>{key}</td>
                      <td >
                        <input
                          type="text"
                          name={key}
                          value={modifiedValues[key]}
                          onChange={handleInputChange}
                          readOnly={key === 'codeinventaire'}
                          style={{ backgroundColor: key === 'codeinventaire' ? 'lightgray' : 'white' }}
                        />
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
            <button className="close-button" onClick={handleSubmit}>Submit</button>
            <div>**Pour modifier le code d'inventaire, il est nécessaire <br/>de le supprimer puis de le recréer.</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventaireTable;
