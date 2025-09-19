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

INSERT INTO ferramentas (codigo_barras_ferramenta, nome, descricao) VALUES
('F-1', 'Martelo de Unha', 'Cabo emborrachado, cabeça de 27mm.'),
('F-2', 'Chave Phillips #2', 'Ponta imantada, haste de 6 polegadas.'),
('F-3', 'Chave de Fenda 1/4"', 'Ponta chata, haste de 6 polegadas.'),
('F-4', 'Alicate de Corte Diagonal', '6 polegadas, ideal para eletrônica.'),
('F-5', 'Alicate de Bico Meia Cana', '8 polegadas, para locais de difícil acesso.'),
('F-6', 'Multímetro Digital', 'Modelo ET-2022A, medição de tensão, corrente e resistência.'),
('F-7', 'Ferro de Solda', '60W, ponta cônica, suporte incluso.'),
('F-8', 'Sugador de Solda', 'Corpo de alumínio, alta capacidade de sucção.'),
('F-9', 'Paquímetro Digital', '150mm, fabricado em aço inoxidável, com estojo.'),
('F-10', 'Furadeira de Impacto', '550W, mandril de 1/2 polegada, com chave.'),
('F-11', 'Estilete Profissional', 'Lâmina de 18mm, corpo metálico.'),
('F-12', 'Trena de 5 Metros', 'Fita de aço com trava e presilha para cinto.');
use sakila;
TRUNCATE TABLE ferramentas;
select * from registros;
select * from ferramentas;

