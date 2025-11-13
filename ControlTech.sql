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

CREATE TABLe registros (
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
('Fa-1', 'Martelo de Unha', 'Cabo emborrachado, cabeça de 27mm.'),
('Fa-2', 'Chave Phillips #2', 'Ponta imantada, haste de 6 polegadas.'),
('Fa-3', 'Chave de Fenda 1/4"', 'Ponta chata, haste de 6 polegadas.'),
('Fa-4', 'Alicate de Corte Diagonal', '6 polegadas, ideal para eletrônica.'),
('Fa-5', 'Alicate de Bico Meia Cana', '8 polegadas, para locais de difícil acesso.'),
('Fa-6', 'Multímetro Digital', 'Modelo ET-2022A, medição de tensão, corrente e resistência.'),
('Fa-7', 'Ferro de Solda', '60W, ponta cônica, suporte incluso.'),
('Fa-8', 'Sugador de Solda', 'Corpo de alumínio, alta capacidade de sucção.'),
('Fa-9', 'Paquímetro Digital', '150mm, fabricado em aço inoxidável, com estojo.'),
('Fa-10', 'Furadeira de Impacto', '550W, mandril de 1/2 polegada, com chave.'),
('Fa-11', 'Estilete Profissional', 'Lâmina de 18mm, corpo metálico.'),
('Fa-12', 'Trena de 5 Metros', 'Fita de aço com trava e presilha para cinto.');
use sakila;
select * from registros;
select * from ferramentas;

