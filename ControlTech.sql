create database Controltech;
use controltech;
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    codigo_barras_usuario VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    tipo ENUM('aluno', 'professor') NOT NULL
);

CREATE TABLE ferramentas (
    id_ferramenta INT PRIMARY KEY AUTO_INCREMENT,
    codigo_barras_ferramenta VARCHAR(50) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

CREATE TABLE registros (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_ferramenta INT NOT NULL,
    data_hora_retirada DATETIME NOT NULL,
    data_hora_devolucao DATETIME,
    
    -- Definindo as chaves estrangeiras para conectar as tabelas
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE NO ACTION,
    FOREIGN KEY (id_ferramenta) REFERENCES ferramentas(id_ferramenta) ON DELETE NO ACTION
);

INSERT INTO usuarios (codigo_barras_usuario, nome, tipo) VALUES
('U001', 'Alice Silva', 'aluno'),
('U002', 'Bruno Costa', 'aluno'),
('U003', 'Carlos Lima', 'professor'),
('U004', 'Daniela Soares', 'professor');

INSERT INTO ferramentas (codigo_barras_ferramenta, nome, descricao) VALUES
('F001', 'Chave de fenda', 'Ferramenta para apertar e soltar parafusos'),
('F002', 'Martelo', 'Ferramenta para pregar pregos'),
('F003', 'Alicate', 'Ferramenta de corte e fixação'),
('F004', 'Multímetro', 'Equipamento de medição elétrica');

-- Empréstimos ainda não devolvidos
INSERT INTO registros (id_usuario, id_ferramenta, data_hora_retirada, data_hora_devolucao) VALUES
(1, 1, '2025-08-20 10:00:00', NULL), -- Alice (aluna)
(2, 2, '2025-08-20 11:00:00', NULL), -- Bruno (aluno)
(3, 3, '2025-08-21 09:30:00', NULL); -- Carlos (professor)


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
    
select * from registros;
