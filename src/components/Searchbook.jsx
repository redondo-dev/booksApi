import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Searchbook= () => {
  const [searchData, setSearchData] = useState("");
  const [endPoint, setEndPoint] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        
       
const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${endPoint}&key=AIzaSyCPQ5VTALlFIBtiq4QhUMSRVaFSM1xnM1o`);
        setSearchData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
 
fetchData();
   }, [endPoint]);


  

  const handleSearchChange = (e) => {
    setEndPoint(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
   
  };

 return (
    <div>
    <form onSubmit={handleSubmit}> 
        <input className="search input"
          type="text"
           value={endPoint}
         onChange={handleSearchChange} placeholder="Rechercher un livre" />
         <button className="search button"type="submit">Rechercher</button>
    
  
        {searchData ? (
          <div>
            <h2>Liste des livres</h2>
            {searchData.items ? (
              searchData.items.map((book) => {
                let thumbnail =
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.smallThumbnail;
                let amount =
                  book.saleInfo.listPrice &&
                  book.saleInfo.listPrice.amount;

                if (thumbnail !== undefined && amount !== undefined) {
                  return (
                    <div className="card" key={book.id}>
                      <p>Titre : {book.volumeInfo.title}</p>
                      <p>
                        Auteur(s) :{" "}
                        {book.volumeInfo.authors
                          ? book.volumeInfo.authors.join(", ")
                          : "Inconnu"}
                      </p>
                      <p>Titre : {book.volumeInfo.title}</p>
                      <p>Prix : {amount}</p>
                      <img
                        src={thumbnail}
                        alt="livre"
                        width={200}
                        height={200}
                      />
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p>Données livres indisponibles</p>
            )}
          </div>
        ) : (
          <p>Chargement des données des livres dispo...</p>
        )}
      </form>
    </div>
  );
};

export default Searchbook;




