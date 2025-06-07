import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './CharacterModal.css';

function CharacterModal({ character, position, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current && position) {
      const modal = modalRef.current;
      const modalRect = modal.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Popup'ın ekranın dışına taşmasını önle
      let left = position.left + position.width + 10; // Varsayılan olarak sağa doğru
      let top = position.top;

      // Sağa sığmazsa sola göster
      if (left + modalRect.width > windowWidth) {
        left = position.left - modalRect.width - 10;
      }

      // Alta sığmazsa yukarı göster
      if (top + modalRect.height > windowHeight) {
        top = Math.max(10, top - modalRect.height + position.height);
      }

      // Üste sığmazsa aşağı göster
      if (top < 0) {
        top = position.top + position.height + 10;
      }

      modal.style.left = `${left}px`;
      modal.style.top = `${top}px`;
    }
  }, [position]);

  if (!character || !position) return null;

  return createPortal(
    <div className="character-modal" ref={modalRef}>
      <div className="modal-content">
        <img src={character.image} alt={character.name} className="character-image" />
        <h2 className="character-name">{character.name}</h2>
        <div className="character-info">
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`status-badge status-${character.status.toLowerCase()}`}>
              {character.status}
            </span>
          </div>
          <div className="info-row">
            <span className="label">Species:</span>
            <span>{character.species}</span>
          </div>
          <div className="info-row">
            <span className="label">Gender:</span>
            <span>{character.gender}</span>
          </div>
          <div className="info-row">
            <span className="label">Origin:</span>
            <span>{character.origin.name}</span>
          </div>
          <div className="info-row">
            <span className="label">Location:</span>
            <span>{character.location.name}</span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CharacterModal;
