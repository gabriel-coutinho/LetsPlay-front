/* eslint consistent-return: off */

import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

import { CustomTextField } from '../styles/inputs.style';
import { CustomButton, CancelButton } from '../styles/button.style';
import { getSports, updatePost } from '../../api';
import { fullDatetime } from '../../utils/dateFormat';
import { PostContext } from '../../pages/editPost/contexts';
import Dialog from '../SimpleDialogSport';
import Spinner from '../spinnerLoading';

import '../loginForm/loginForm.css';

export default function EditPostForm() {
  const style = useStyles();
  const history = useHistory();
  const { postById } = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [describe, setDescribe] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [selectedSport, setSelectedSport] = useState('Escolha um esporte');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [sports, setSports] = useState([]);
  const [fullSports, setFullSports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vacancy, setVacancy] = useState('');

  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorVacancy, setErrorVacancy] = useState(false);

  const [errorDistrict, setErrorDistrict] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (value) => {
    setOpenDialog(false);
    setSelectedSport(value);
  };

  useEffect(() => {
    if (price < 0) setPrice(0);
  }, [price]);

  useEffect(() => {
    if (vacancy < 1) setVacancy(1);
  }, [vacancy]);

  useEffect(() => {
    if (postById) {
      setTitle(postById.title);
      setDescribe(postById.describe);
      setPrice(postById.price);
      setDate(fullDatetime(postById.date));
      setVacancy(postById.vacancy);
      setSelectedSport(postById.sport?.name);
      setStreet(postById.address?.street);
      setNumber(postById.address?.number);
      setDistrict(postById.address?.district);
      setCity(postById.address?.city);
      setState(postById.address?.state);
      setZipCode(postById.address?.zipCode);
      setComplement(postById.address?.complement);
    }
  }, [postById]);

  useEffect(async () => {
    const result = await getSports();
    if (result) {
      setFullSports(result.data);
      setSports(result.data.map((sport) => sport.name));
    }
  }, []);

  useEffect(async () => {
    if (fullSports.length > 0) {
      const fullSport = fullSports.find((sport) => sport.name === selectedSport);
      setSelectedId(fullSport?.id);
    }
  }, [selectedSport]);

  const validateVacancy = () => {
    const validated = !vacancy || vacancy === '' || vacancy < 1;
    setErrorVacancy(validated);

    return !validated;
  };

  const validateSport = () => {
    const validated =
      !selectedSport || selectedSport.trim() === '' || selectedSport === 'Escolha um esporte';

    if (validated) toast.error('Escolha um esporte!');

    return !validated;
  };

  const validateTitle = () => {
    const validated = !title || title === '';
    setErrorTitle(validated);

    return !validated;
  };

  const validateDate = () => {
    const validated = !date || date === '';
    setErrorDate(validated);

    return !validated;
  };

  const validateDistrict = () => {
    const validated = !district || district.trim() === '';
    setErrorDistrict(validated);

    return !validated;
  };
  const validateState = () => {
    let validated = !state || state === '';
    if (!validated) {
      setState((prev) => prev.toUpperCase());
      validated = !states.includes(state);
    }

    setErrorState(validated);

    return !validated;
  };
  const validateCity = () => {
    const validated = !city || city.trim() === '';
    setErrorCity(validated);

    return !validated;
  };

  const validateInputs = () => {
    validateVacancy();
    validateTitle();
    validateDate();
    validateState();
    validateDistrict();
    validateCity();

    return (
      validateVacancy() &&
      validateSport() &&
      validateTitle() &&
      validateDate() &&
      validateState() &&
      validateDistrict() &&
      validateCity()
    );
  };

  const auth = () => {
    if (!validateInputs()) {
      // error nos inputs nao preenchidos
      return false;
    }
    return true;
  };

  const hasChanges = () =>
    title !== postById.title ||
    describe !== postById.describe ||
    price !== postById.price ||
    date !== postById.date ||
    vacancy !== postById.vacancy ||
    selectedSport !== postById.sport?.name ||
    street !== postById.address?.street ||
    number !== postById.address?.number ||
    district !== postById.address?.district ||
    city !== postById.address?.city ||
    state !== postById.address?.state ||
    zipCode !== postById.address?.zipCode ||
    complement !== postById.address?.complement;

  const updatePostRequest = async () => {
    if (auth()) {
      if (hasChanges()) {
        const result = await updatePost(
          postById.id,
          title,
          describe,
          selectedId,
          date,
          price,
          vacancy,
          street,
          number,
          district,
          city,
          state,
          zipCode,
          complement,
          setIsLoading
        );
        if (result) {
          toast.success(`Post atualizado com sucesso!`);
        }
      } else {
        toast.success(`Post atualizado com sucesso! SEM MUDANCA`);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      updatePostRequest();
    }
  };

  const handleCancel = () => history.push('/home');

  return (
    <>
      <form className={style.form}>
        <Typography paragraph>Evento</Typography>
        <div className={`${style.multiFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.largeField}
            label="Título*"
            error={errorTitle}
            variant="outlined"
            value={title}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={style.shortField}>
            <Button variant="outlined" onClick={handleClickOpenDialog}>
              {selectedSport}
            </Button>
            <Dialog
              selectedValue={selectedSport}
              open={openDialog}
              onClose={handleCloseDialog}
              sports={sports}
            />
          </div>
        </div>
        <div className={`${style.multiFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.threeField}
            label="Data do evento*"
            error={errorDate}
            type="datetime-local"
            variant="outlined"
            value={date}
            onKeyDown={handleKeyDown}
            onChange={(e) => setDate(e.target.value)}
          />
          <CustomTextField
            className={style.threeField}
            label="Valor"
            type="number"
            variant="outlined"
            value={price}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPrice(e.target.value)}
          />
          <CustomTextField
            className={style.threeField}
            label="Vagas*"
            error={errorVacancy}
            type="number"
            variant="outlined"
            value={vacancy}
            onKeyDown={handleKeyDown}
            onChange={(e) => setVacancy(e.target.value)}
          />
        </div>
        <CustomTextField
          className={style.bottomSpace}
          multiline
          minRows={3}
          label="Descrição"
          variant="outlined"
          value={describe}
          onKeyDown={handleKeyDown}
          onChange={(e) => setDescribe(e.target.value)}
        />
        <Typography paragraph>Endereço</Typography>
        <div className={`${style.multiFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.largeField}
            label="Rua/Avenida"
            variant="outlined"
            type="text"
            value={street}
            onKeyDown={handleKeyDown}
            onChange={(e) => setStreet(e.target.value)}
          />
          <CustomTextField
            className={style.shortField}
            label="Número"
            type="text"
            variant="outlined"
            value={number}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className={`${style.multiFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.threeField}
            label="Bairro*"
            error={errorDistrict}
            type="text"
            variant="outlined"
            value={district}
            onKeyDown={handleKeyDown}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <CustomTextField
            className={style.threeField}
            label="City*"
            error={errorCity}
            type="text"
            variant="outlined"
            value={city}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCity(e.target.value)}
          />
          <CustomTextField
            className={style.threeField}
            label="Estado(Sigla)*"
            error={errorState}
            type="text"
            variant="outlined"
            value={state}
            onKeyDown={handleKeyDown}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={`${style.multiFields} ${style.bottomSpace}`}>
          <CustomTextField
            className={style.shortField}
            label="CEP"
            variant="outlined"
            value={zipCode}
            onKeyDown={handleKeyDown}
            onChange={(e) => setZipCode(e.target.value)}
          />
          <CustomTextField
            className={style.largeField}
            label="Complemento"
            variant="outlined"
            value={complement}
            onKeyDown={handleKeyDown}
            onChange={(e) => setComplement(e.target.value)}
          />
        </div>
        <CustomButton size="medium" className={style.bottomSpaceButton} onClick={updatePostRequest}>
          ATUALIZAR POST
        </CustomButton>
        <CancelButton size="medium" onClick={handleCancel}>
          Cancelar
        </CancelButton>
        <div className={style.spinner}>{isLoading && <Spinner />}</div>
      </form>
    </>
  );
}
