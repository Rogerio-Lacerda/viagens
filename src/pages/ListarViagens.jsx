import React from 'react';
import styles from '../styles/pages/ListarViagens.module.css';
import Header from '../components/Header';
import Button from '../components/Button';
import Toast from '../components/Toast';
import Input from '../components/Input';

const ListarViagens = () => {
  const [data, setData] = React.useState([]);
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
  const [idColaborador, setIdColaborador] = React.useState('');
  const [idViagem, setIdViagem] = React.useState('');
  const [isEditar, setIsEditar] = React.useState(false);
  const [loadingViagens, setLoadingViagens] = React.useState(false);

  React.useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8888/api/viagem`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Viagens Listada com sucesso:', data);

          if (
            data.message === 'Lista de viagens recuperada com sucesso' &&
            data.status_code === 200
          ) {
            setData(data.viagens);
          } else {
            setData([]);
          }
        } else {
          console.error('Erro na listagem:', data);
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };
    fetchViagens();
  }, [loadingViagens]);

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

    const formsFormatado = { ...forms, colaborador_id: idColaborador };

    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/viagem/${idViagem}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formsFormatado),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Viagem editada com sucesso:', data);
        setToast('Viagem editada com sucesso');
        setIsToast(true);
        setTypeToast('success');
        setTimeout(() => {
          setIsToast(false);
        }, 3000);
        setLoadingViagens((loadingViagens) => !loadingViagens);
        setError('');
        setSucess('Viagem editada com sucesso!');
      } else {
        console.error('Erro no cadastro:', data);
        setToast('Erro ao editar viagem');
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

  React.useEffect(() => {
    console.log(idColaborador);
  }, [idColaborador]);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };
  return (
    <>
      <Header />
      <div className={styles.listarViagens}>
        {isToast ? <Toast texto={toast} type={typeToast} /> : null}
        <h1>Minhas viagens</h1>
        {data.length > 0 ? (
          <>
            <div className={styles.content}>
              {data.map((item, index) => {
                return (
                  <div key={`viagem${index}`}>
                    <p>
                      Origem: <span>{item.origem}</span>
                    </p>
                    <p>
                      Destino: <span>{item.destino}</span>
                    </p>
                    <p>
                      Partida: <span>{formatarData(item.data_inicio)}</span>
                    </p>
                    <p>
                      Volta: <span>{formatarData(item.data_fim)}</span>
                    </p>
                    <p>
                      Motivo: <span>{item.motivo}</span>
                    </p>
                    <p className={styles.statusSolicitado}>
                      Status:
                      <span className={styles.statusSolicitado}>
                        {item.status}
                      </span>
                    </p>
                    <button
                      className={styles.btnEditar}
                      onClick={() => {
                        setIdColaborador(item.colaborador_id);
                        setIdViagem(item.id);
                        setIsEditar(true);
                      }}
                    >
                      Editar
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p>Não existem viagens agendadas!</p>
        )}
      </div>
      {isEditar ? (
        <div className={styles.popupOverlay}>
          <form onSubmit={handleSubmit} className={styles.popupContent}>
            <div
              className={styles.closedBtn}
              onClick={() => {
                setIsEditar(false);
              }}
            >
              X
            </div>
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
            <Button texto="Editar" />
          </form>
        </div>
      ) : null}
    </>
  );
};

export default ListarViagens;
