import React from 'react';
import Header from '../components/Header';
import styles from '../styles/pages/CadastrarColaborador.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import Toast from '../components/Toast';

const CadastrarColaborador = () => {
  const [forms, setForms] = React.useState({
    nome: '',
    data_nasc: '',
    data_adm: '',
    data_dem: '',
    cargo_id: '',
    area: '',
    gestao: '',
    status: true,
  });
  const [, setError] = React.useState('');
  const [, setSucess] = React.useState('');
  const [toast, setToast] = React.useState('');
  const [typeToast, setTypeToast] = React.useState('success');
  const [isToast, setIsToast] = React.useState('');
  const [areas, setAreas] = React.useState([]);
  const [cargos, setCargos] = React.useState([]);
  const [colaboradores, setColaboradores] = React.useState([]);

  // Carregar dados iniciais
  React.useEffect(() => {
    loadAreas();
    loadCargos();
    loadColaboradores();
  }, []);

  const loadAreas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8888/api/area');
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error('Erro ao carregar áreas:', error);
    }
  };

  const loadCargos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8888/api/cargo');
      const data = await response.json();
      setCargos(data);
    } catch (error) {
      console.error('Erro ao carregar cargos:', error);
    }
  };

  const loadColaboradores = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8888/api/colaborador');
      const data = await response.json();
      setColaboradores(data);
    } catch (error) {
      console.error('Erro ao carregar colaboradores:', error);
    }
  };

  const handleChange = ({ target }) => {
    const { id, value, type, checked } = target;
    setForms({ 
      ...forms, 
      [id]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucess('');

    // Validações
    const dataNasc = new Date(forms.data_nasc);
    const dataAdm = new Date(forms.data_adm);
    const dataDem = new Date(forms.data_dem);

    if (dataNasc >= dataAdm) {
      setToast('Erro: A data de nascimento deve ser anterior à data de admissão');
      setIsToast(true);
      setTypeToast('error');
      setTimeout(() => setIsToast(false), 3000);
      return;
    }

    if (dataAdm >= dataDem) {
      setToast('Erro: A data de admissão deve ser anterior à data de demissão');
      setIsToast(true);
      setTypeToast('error');
      setTimeout(() => setIsToast(false), 3000);
      return;
    }

    try {
      const response = await fetch(
        'http://127.0.0.1:8888/api/colaborador/cadastro',
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
        console.log('Colaborador cadastrado com sucesso:', data);
        setToast('Colaborador cadastrado com sucesso');
        setIsToast(true);
        setTypeToast('success');
        setTimeout(() => setIsToast(false), 3000);

        // Limpar formulário
        setForms({
          nome: '',
          data_nasc: '',
          data_adm: '',
          data_dem: '',
          cargo_id: '',
          area: '',
          gestao: '',
          status: true,
        });

        setError('');
        setSucess('Colaborador cadastrado com sucesso!');
      } else {
        console.error('Erro no cadastro:', data);
        setToast('Erro ao cadastrar colaborador');
        setIsToast(true);
        setTypeToast('error');
        setTimeout(() => setIsToast(false), 3000);
        setSucess('');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setToast('Erro na conexão com o servidor');
      setIsToast(true);
      setTypeToast('error');
      setTimeout(() => setIsToast(false), 3000);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.cadastrarColaborador}>
        {isToast ? <Toast texto={toast} type={typeToast} /> : null}

        <h1>Cadastrar Colaborador</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            id="nome"
            label="Nome Completo"
            value={forms.nome}
            onChange={handleChange}
            required
          />
          
          <Input
            type="date"
            id="data_nasc"
            label="Data de Nascimento"
            value={forms.data_nasc}
            onChange={handleChange}
            required
          />
          
          <Input
            type="date"
            id="data_adm"
            label="Data de Admissão"
            value={forms.data_adm}
            onChange={handleChange}
            required
          />
          
          <Input
            type="date"
            id="data_dem"
            label="Data de Demissão"
            value={forms.data_dem}
            onChange={handleChange}
            required
          />

          <div className={styles.selectGroup}>
            <label htmlFor="cargo_id">Cargo</label>
            <select 
              id="cargo_id" 
              value={forms.cargo_id} 
              onChange={handleChange}
              required
            >
              <option value="">Selecione um cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.cargo}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <label htmlFor="area">Área</label>
            <select 
              id="area" 
              value={forms.area} 
              onChange={handleChange}
              required
            >
              <option value="">Selecione uma área</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.area}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectGroup}>
            <label htmlFor="gestao">Gestor (Opcional)</label>
            <select 
              id="gestao" 
              value={forms.gestao} 
              onChange={handleChange}
            >
              <option value="">Selecione um gestor</option>
              {colaboradores.map((colaborador) => (
                <option key={colaborador.id} value={colaborador.id}>
                  {colaborador.nome}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.checkboxGroup}>
            <label htmlFor="status" className={styles.checkboxLabel}>
              <input
                type="checkbox"
                id="status"
                checked={forms.status}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <span className={styles.checkboxText}>Ativo</span>
            </label>
          </div>

          <Button texto="Cadastrar Colaborador" />
        </form>
      </div>
    </>
  );
};

export default CadastrarColaborador;

