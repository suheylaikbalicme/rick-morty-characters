import React from "react";

function TableView({ characters, onSelectCharacter }) {
  const handleCharacterClick = (character, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    
    onSelectCharacter(character, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Durum</th>
            <th>Tür</th>
            <th>Resim</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <tr 
              key={char.id}
              className="character-row"
              role="button"
              aria-label={`View details for ${char.name}`}
            >
              <td 
                className="character-name"
                onClick={(e) => handleCharacterClick(char, e)}
              >
                {char.name}
              </td>
              <td onClick={(e) => handleCharacterClick(char, e)}>
                <span className={`status-${char.status.toLowerCase()}`}>
                  {char.status}
                </span>
              </td>
              <td onClick={(e) => handleCharacterClick(char, e)}>
                {char.species}
              </td>
              <td onClick={(e) => handleCharacterClick(char, e)}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img 
                    src={char.image} 
                    alt={char.name} 
                    width="100" 
                    height="100" 
                    className="character-image"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;
