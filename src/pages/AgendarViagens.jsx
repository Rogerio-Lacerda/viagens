import React from 'react';
import Header from '../components/Header';
import styles from '../styles/pages/AgendarViagens.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import Toast from '../components/Toast';

const AgendarViagens = () => {
  const [forms, setForms] = React.useState({
    origem: '',
    destino: '',
    data_inicio: '',
    data_fim: '',
    motivo: '',
    colaborador_id: 1,
  });
  const [, setError] = React.useState('');
  const [, setSucess] = React.useState('');
  const [toast, setToast] = React.useState('');
  const [typeToast, setTypeToast] = React.useState('success');
  const [isToast, setIsToast] = React.useState('');

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForms({ ...forms, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucess('');

    const inicio = new Date(forms.data_inicio);
    const fim = new Date(forms.data_fim);

    if (inicio > fim) {
      setToast(
        'Erro: A data de partida não pode ser depois que a data de volta',
      );
      setIsToast(true);
      setTypeToast('error');
      setTimeout(() => {
        setIsToast(false);
      }, 3000);
      return; // interrompe o envio do formulário
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/viagem/cadastro`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(forms),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Viagem agendada com sucesso:', data);
        setToast('Viagem agendada com sucesso');
        setIsToast(true);
        setTypeToast('success');
        setTimeout(() => {
          setIsToast(false);
        }, 3000);

        setError('');
        setSucess('Viagem agendada com sucesso!');
      } else {
        console.error('Erro no cadastro:', data);
        setToast('Erro ao agendar viagem');
        setIsToast(true);
        setTypeToast('error');
        setTimeout(() => {
          setIsToast(false);
        }, 3000);

        setSucess('');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.agendarViagens}>
        {isToast ? <Toast texto={toast} type={typeToast} /> : null}

        <h1>Agende sua viagem</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            id="origem"
            label="Origem"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            id="destino"
            label="Destino"
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            id="data_inicio"
            label="Partida"
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            id="data_fim"
            label="Volta"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            id="motivo"
            label="Motivo"
            onChange={handleChange}
            required
          />
          <Button texto="Agendar" />
        </form>
      </div>
    </>
  );
};

export default AgendarViagens;
