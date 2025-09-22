import React from 'react';
import styles from '../styles/pages/ListarColaboradores.module.css';
import Header from '../components/Header';

const ListarColaboradores = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8888/colaboradores/colaborador/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const data = await response.json();

        if (response.ok) {
          console.log('Colaboradores listados com sucesso:', data);

          if (data) {
            setData(data);
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
    fetchColaboradores();
  }, []);
  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };
  function getCargoByValue(value) {
    const cargos = {
      1: 'Estagiario',
      2: 'Assistente',
      3: 'Analista',
      4: 'Coordenador',
      5: 'Gerente',
      6: 'Diretor',
      7: 'Ceo',
    };

    return cargos[value] || 'Cargo não encontrado';
  }

  function getAreaByValue(value) {
    const areas = {
      1: 'Financeiro',
      2: 'Recursos humanos',
      3: 'Comercial',
      4: 'Marketing',
      5: 'Suporte',
      6: 'TI',
      7: 'Operações',
      8: 'Logistica',
    };

    return areas[value] || 'Área não encontrada';
  }

  return (
    <>
      <Header />
      <div className={styles.listarColaboradores}>
        <h1>Minhas viagens</h1>
        {data.length > 0 ? (
          <div className={styles.content}>
            {data.map((item, index) => {
              return (
                <div key={`Colaborador${index}`}>
                  <p>
                    Nome: <span>{item.nome}</span>
                  </p>
                  <p>
                    Data de nascimento:{' '}
                    <span>{formatarData(item.data_nasc)}</span>
                  </p>
                  <p>
                    Data de admissao: <span>{formatarData(item.data_adm)}</span>
                  </p>
                  <p>
                    Área: <span>{getAreaByValue(item.area)}</span>
                  </p>
                  <p>
                    Cargo: <span>{getCargoByValue(item.cargo_id)}</span>
                  </p>
                  <p
                    className={`${
                      item.status ? styles.statusTrue : styles.statusFalse
                    }`}
                  >
                    Status:
                    <span
                      className={`${
                        item.status ? styles.statusTrue : styles.statusFalse
                      }`}
                    >
                      {item.status ? 'Ativo' : 'Inativo'}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Não existem colaboradores cadastrados!</p>
        )}
      </div>
    </>
  );
};

export default ListarColaboradores;
