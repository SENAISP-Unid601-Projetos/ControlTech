/* =========================================================
   SCRIPT ATUALIZADO DO BANCO DE DADOS - PROJETO CONTROLTECH
   (Com adição da tabela de ARMÁRIOS)
=========================================================
*/

CREATE DATABASE IF NOT EXISTS Controltech;
USE controltech;

/* Tabela de Usuários (Operadores, Gestores) */
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    codigo_barras_usuario VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    tipo ENUM('aluno', 'professor') NOT NULL
);

/* =========================================================
   NOVA TABELA: ARMÁRIOS
   Define onde as ferramentas são guardadas.
=========================================================
*/
CREATE TABLE IF NOT EXISTS armarios (
    id_armario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    localizacao VARCHAR(255) COMMENT 'Ex: Bloco B, Sala 102'
);


/* =========================================================
   TABELA MODIFICADA: FERRAMENTAS
   Adicionamos a coluna 'id_armario' para vincular
   a ferramenta ao seu local padrão (seu "lar").
=========================================================
*/
CREATE TABLE IF NOT EXISTS ferramentas (
    id_ferramenta INT PRIMARY KEY AUTO_INCREMENT,
    codigo_barras_ferramenta VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    status ENUM('DISPONÍVEL', 'EM USO', 'EM MANUTENÇÃO', 'QUEBRADO') NOT NULL DEFAULT 'DISPONÍVEL',
    
    /* ADIÇÃO DA CHAVE ESTRANGEIRA */
    id_armario INT NOT NULL,
    
    FOREIGN KEY (id_armario) REFERENCES armarios(id_armario) ON DELETE RESTRICT
    /* ON DELETE RESTRICT: Impede que alguém delete um armário 
       se ainda existirem ferramentas cadastradas nele.
    */
);

/* Tabela de Movimentação (Check-in / Check-out)
   Esta tabela não muda, pois ela rastreia a posse 
   (quem pegou) e não o local.
*/
CREATE TABLE IF NOT EXISTS registros (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_ferramenta INT NOT NULL,
    data_hora_retirada DATETIME NOT NULL,
    data_hora_devolucao DATETIME,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_ferramenta) REFERENCES ferramentas(id_ferramenta) ON DELETE NO ACTION
);

/* =========================================================
   INSERÇÃO DE DADOS DE EXEMPLO
=========================================================
*/

-- Limpando tabelas para evitar duplicatas (opcional, para testes)
/*
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE registros;
TRUNCATE TABLE usuarios;
TRUNCATE TABLE ferramentas;
TRUNCATE TABLE armarios;
SET FOREIGN_KEY_CHECKS = 1;
*/

-- 1. Cadastra os Armários PRIMEIRO
INSERT INTO armarios (nome, localizacao) VALUES
('A01', 'Bancada de Eletrônica'),
('A02', 'Bancada de Mecânica');

-- 2. Cadastra os Usuários
INSERT INTO usuarios (codigo_barras_usuario, nome, tipo) VALUES
('U001', 'Alice Silva', 'aluno'),
('U002', 'Bruno Costa', 'aluno'),
('U003', 'Carlos Lima', 'professor'),
('U004', 'Daniela Soares', 'professor');

-- 3. Cadastra as Ferramentas, indicando o ID do armário
INSERT INTO ferramentas (codigo_barras_ferramenta, nome, descricao, id_armario) VALUES
('F001', 'Chave de fenda', 'Ferramenta para apertar e soltar parafusos', 1), -- Armário A01
('F002', 'Martelo', 'Ferramenta para pregar pregos', 2), -- Armário A02
('F003', 'Alicate', 'Ferramenta de corte e fixação', 1), -- Armário A01
('F004', 'Multímetro', 'Equipamento de medição elétrica', 1); -- Armário A01

/* =========================================================
   EXEMPLO DE TRANSAÇÕES (MOVIMENTAÇÃO)
=========================================================
*/

-- Alice (ID 1) retira a Chave de fenda (ID 1)
INSERT INTO registros (id_usuario, id_ferramenta, data_hora_retirada) VALUES
(1, 1, '2025-08-20 10:00:00');
UPDATE ferramentas SET status = 'EM USO' WHERE id_ferramenta = 1;

-- Bruno (ID 2) retira o Martelo (ID 2)
INSERT INTO registros (id_usuario, id_ferramenta, data_hora_retirada) VALUES
(2, 2, '2025-08-20 11:00:00');
UPDATE ferramentas SET status = 'EM USO' WHERE id_ferramenta = 2;

-- Carlos (ID 3) retira o Alicate (ID 3)
INSERT INTO registros (id_usuario, id_ferramenta, data_hora_retirada) VALUES
(3, 3, '2025-08-21 09:30:00');
UPDATE ferramentas SET status = 'EM USO' WHERE id_ferramenta = 3;

/* =========================================================
   CONSULTAS (DASHBOARD) ATUALIZADAS
=========================================================
*/

-- CONSULTA 1: Dashboard principal (Status e Localização de todas as ferramentas)
-- Esta é a consulta mais importante para o seu dashboard.
SELECT 
    f.nome AS ferramenta,
    f.status,
    a.nome AS local_padrao (armario),
    u.nome AS com_quem_esta,
    r.data_hora_retirada
FROM 
    ferramentas AS f
/* Junta com Armários para saber o local padrão */
JOIN 
    armarios AS a ON f.id_armario = a.id_armario
/* Junta com Registros e Usuários para saber QUEM pegou (se estiver 'EM USO') */
LEFT JOIN 
    registros AS r ON f.id_ferramenta = r.id_ferramenta AND r.data_hora_devolucao IS NULL
LEFT JOIN 
    usuarios AS u ON r.id_usuario = u.id_usuario
ORDER BY 
    f.status, a.nome, f.nome;


-- CONSULTA 2: Quantidade de ferramentas emprestadas por tipo de usuário (Sua consulta)
SELECT
    u.tipo,
    COUNT(r.id_registro) AS total_ferramentas_emprestadas
FROM
    registros AS r
JOIN
    usuarios AS u ON r.id_usuario = u.id_usuario
WHERE
    r.data_hora_devolucao IS NULL
GROUP BY
    u.tipo;

-- CONSULTA 3: Histórico de uma ferramenta específica (Ex: Chave de fenda, ID 1)
SELECT
    r.data_hora_retirada,
    r.data_hora_devolucao,
    u.nome AS usuario_que_retirou
FROM
    registros AS r
JOIN
    usuarios AS u ON r.id_usuario = u.id_usuario
WHERE
    r.id_ferramenta = 1
ORDER BY
    r.data_hora_retirada DESC;