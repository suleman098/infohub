import React, { useEffect } from 'react';
import Modal from 'react-modal';
import styles from './ArticleModal.module.css';

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: {
    name: string;
  };
};

type ArticleModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  article: Article;
};

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onRequestClose, article }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const appElement = document.getElementById('__next');
      if (appElement) {
        Modal.setAppElement(appElement);
      }
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      closeTimeoutMS={300} // To handle the fade-out animation
      ariaHideApp={false} // Disable hiding app element to avoid warnings
    >
      <button onClick={onRequestClose} className={styles.closeButton}>X</button>
      <div className={styles.content}>
        {article.urlToImage && <img src={article.urlToImage} alt={article.title} className={styles.image} />}
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.description}>{article.description}</p>
        <p className={styles.source}>Source: {article.source.name}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
          Read full article
        </a>
      </div>
    </Modal>
  );
};

export default ArticleModal;
