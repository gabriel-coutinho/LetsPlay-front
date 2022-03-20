import { toast } from 'react-toastify';
import React, { useState, useContext } from 'react';
import { useStyles } from './styles';
import { CustomTextField } from '../styles/inputs.style';
import { CustomButton } from '../styles/button.style';
import { LoggedUserContext } from '../../utils/loggedUserProvider';
import { CommentsContext } from '../postCard/contexts';
import { createComment } from '../../api';

export default function CommentForm({ postId }) {
  const style = useStyles();
  const { loggedUser } = useContext(LoggedUserContext);
  const { updateCommentsInPost } = useContext(CommentsContext);
  const [content, setContent] = useState('');
  const [errorContent, setErrorContent] = useState(false);

  const validateContent = () => {
    const validated = !content || content === '' || content.trim() === '';
    setErrorContent(validated);

    return !validated;
  };

  const handleCreate = async () => {
    if (validateContent()) {
      const ownerId = loggedUser.id;
      await createComment(content, ownerId, postId);
      toast.success('Comentário criado com sucesso!');
      updateCommentsInPost();
    } else {
      toast.error('Comentário deve ter algum conteúdo!');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreate();
    }
  };

  return (
    <form className={style.root}>
      <CustomTextField
        multiline
        minRows={3}
        className={style.input}
        label="Escreva um comentário"
        error={errorContent}
        variant="outlined"
        value={content}
        onKeyDown={handleKeyDown}
        onChange={(e) => setContent(e.target.value)}
      />
      <CustomButton className={style.button} size="large" onClick={handleCreate}>
        Comentar
      </CustomButton>
    </form>
  );
}
