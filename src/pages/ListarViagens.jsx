import React from 'react';
import styles from '../styles/pages/ListarViagens.module.css';
import Header from '../components/Header';

const ListarViagens = () => {
  const [data, setData] = React.useState([]);

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
  }, []);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };
  return (
    <>
      <Header />
      <div className={styles.listarViagens}>
        <h1>Minhas viagens</h1>
        {data.length > 0 ? (
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
                </div>
              );
            })}
          </div>
        ) : (
          <p>Não existem viagens agendadas!</p>
        )}
      </div>
    </>
  );
};

export default ListarViagens;
