DROP TABLE "aluno" CASCADE;

CREATE TABLE  "aluno" (
   "id" Serial NOT NULL,
   "nome"   VARCHAR NULL, 
   "matricula"   INTEGER NOT NULL DEFAULT NULL, 
   "dt_nascimento"   DATE NULL DEFAULT NULL, 
   "cpf"   VARCHAR NULL DEFAULT NULL, 
   "rg"   VARCHAR NULL DEFAULT NULL, 
   "sexo" VARCHAR NULL DEFAULT NULL,
   "telefone_fixo"   INTEGER NULL DEFAULT NULL, 
   "telefone_movel"   INTEGER NULL DEFAULT NULL, 
   "telefone_comercial"   INTEGER NULL DEFAULT NULL, 
   "status"   INTEGER NULL DEFAULT NULL, 
   "fk_profissao"   INTEGER NULL DEFAULT NULL, 
   "origem_contato"   VARCHAR NULL DEFAULT NULL, 
   "email"   VARCHAR NULL DEFAULT NULL, 
   "senha"   VARCHAR NULL DEFAULT NULL, 
   "cep"   INTEGER NULL DEFAULT NULL, 
   "logradouro"   VARCHAR NULL DEFAULT NULL, 
   "numero"   INTEGER NULL DEFAULT NULL, 
   "complemento"   VARCHAR NULL DEFAULT NULL, 
   "bairro"   VARCHAR NULL DEFAULT NULL, 
   "estado"   VARCHAR NULL DEFAULT NULL, 
   "cidade"   VARCHAR NULL DEFAULT NULL, 
   "referencia"   VARCHAR NULL DEFAULT NULL, 
   "observacao"   text NULL DEFAULT NULL, 
   "fk_responsavel"   INTEGER NULL DEFAULT NULL, 
   "created_at"   timestamp without time zone NULL DEFAULT NULL, 
   "updated_at"   timestamp without time zone NULL DEFAULT NULL, 
   primary key ("id")
);
		

-- ---
-- Table 'professor'
-- 
-- ---

DROP TABLE "professor" CASCADE;

CREATE TABLE  "professor" (
   "id" Serial NOT NULL,
   "nome"   VARCHAR NULL DEFAULT NULL, 
   "fk_disciplina"   INTEGER NULL DEFAULT NULL, 
   "dt_nascimento"   DATE NULL DEFAULT NULL, 
   "cpf"   VARCHAR NULL DEFAULT NULL, 
   "rg"   VARCHAR NULL DEFAULT NULL, 
   "telefone_fixo"   INTEGER NULL DEFAULT NULL, 
   "telefone_movel"   INTEGER NULL DEFAULT NULL, 
   "status"   INTEGER NULL DEFAULT NULL, 
   "email"   VARCHAR NULL DEFAULT NULL, 
   "senha"   VARCHAR NULL DEFAULT NULL, 
   "cep"   INTEGER NULL DEFAULT NULL, 
   "logradouro"   VARCHAR NULL DEFAULT NULL, 
   "numero"   INTEGER NULL DEFAULT NULL, 
   "complemento"   VARCHAR NULL DEFAULT NULL, 
   "bairro"   VARCHAR NULL DEFAULT NULL, 
   "estado"   VARCHAR NULL DEFAULT NULL, 
   "cidade"   VARCHAR NULL DEFAULT NULL, 
   "referencia"   VARCHAR NULL DEFAULT NULL, 
   "observacao"   VARCHAR NULL DEFAULT NULL, 
   "valor_hora"   DECIMAL NULL DEFAULT NULL, 
   "banco"   VARCHAR NULL DEFAULT NULL, 
   "agencia"   INTEGER NULL DEFAULT NULL, 
   "conta_corrente"   INTEGER NULL DEFAULT NULL, 
   "created_at"   timestamp without time zone NULL DEFAULT NULL, 
   "updated_at"   timestamp without time zone NULL DEFAULT NULL, 
   primary key ("id")
);
		

-- ---
-- Table 'matricula'
-- 
-- ---

DROP TABLE "matricula" CASCADE;

CREATE TABLE  "matricula" (
   "id" Serial NOT NULL,
   "fk_id_aluno"   INTEGER NOT NULL, 
   "fk_id_turma"   INTEGER NULL DEFAULT NULL, 
   "dt_matricula"   DATE NULL DEFAULT NULL, 
   "valor_curso"   INTEGER NULL DEFAULT NULL,
   "desconto"   INTEGER NULL DEFAULT NULL,
   "status"   INTEGER NULL DEFAULT NULL,
   "created_at"   timestamp without time zone NULL DEFAULT NULL,
   "updated_at"   timestamp without time zone NULL DEFAULT NULL, 
   primary key ("id")
);
		

-- ---
-- Table 'disciplina'
-- 
-- ---

DROP TABLE "disciplina" CASCADE;

CREATE TABLE  "disciplina" (
   "id" Serial NOT NULL,
   "disciplina"   VARCHAR NULL DEFAULT NULL, 
   "valor"   FLOAT NULL DEFAULT NULL, 
   "created_at"   timestamp without time zone NULL DEFAULT NULL, 
   "updated_at"   timestamp without time zone NULL DEFAULT NULL,  
   primary key ("id")
);
		

-- ---
-- Table 'responsavel'
-- 
-- ---

DROP TABLE "responsavel" CASCADE;

CREATE TABLE  "responsavel" (
   "id" Serial NOT NULL,
   "nome"   VARCHAR NULL DEFAULT NULL, 
   "dt_nascimento"   DATE NULL DEFAULT NULL, 
   "cpf"   VARCHAR NULL DEFAULT NULL, 
   "rg"   INTEGER NULL DEFAULT NULL, 
   "telefone_fixo"   INTEGER NULL DEFAULT NULL, 
   "telefone_movel"   INTEGER NULL DEFAULT NULL, 
   "telefone_comercial"   INTEGER NULL DEFAULT NULL, 
   "fk_profissao"   INTEGER NULL DEFAULT NULL, 
   "email"   VARCHAR NULL DEFAULT NULL, 
   "cep"   INTEGER NULL DEFAULT NULL, 
   "logradouro"   VARCHAR NULL DEFAULT NULL, 
   "numero"   INTEGER NULL DEFAULT NULL, 
   "complemento"   VARCHAR NULL DEFAULT NULL, 
   "bairro"   VARCHAR NULL DEFAULT NULL, 
   "estado"   VARCHAR NULL DEFAULT NULL, 
   "cidade"   VARCHAR NULL DEFAULT NULL, 
   "referencia"   VARCHAR NULL DEFAULT NULL, 
   "observacao"   text NULL DEFAULT NULL, 
   "created_at"   timestamp without time zone NULL DEFAULT NULL, 
   "updated_at"   timestamp without time zone NULL DEFAULT NULL, 
   primary key ("id")
);
		

-- ---
-- Table 'turma'
-- 
-- ---

DROP TABLE "turma" CASCADE;

CREATE TABLE  "turma" (
   "id" Serial NOT NULL,
   "fk_professor"   INTEGER NULL DEFAULT NULL, 
   "fk_disciplina"   INTEGER NULL DEFAULT NULL, 
   "dt_inicio"   DATE NULL DEFAULT NULL, 
   "dt_final"   INTEGER NULL DEFAULT NULL, 
   "carga_horaria"   INTEGER NULL DEFAULT NULL,
   "created_at"   timestamp without time zone NULL DEFAULT NULL, 
   "updated_at"   timestamp without time zone NULL DEFAULT NULL,  
   primary key ("id")
);
ALTER TABLE aluno ADD FOREIGN KEY (fk_responsavel) REFERENCES responsavel (id);
ALTER TABLE professor ADD FOREIGN KEY (fk_disciplina) REFERENCES disciplina (id);
ALTER TABLE matricula ADD FOREIGN KEY (fk_id_aluno) REFERENCES aluno (id);
ALTER TABLE matricula ADD FOREIGN KEY (fk_id_turma) REFERENCES turma (id);
ALTER TABLE turma ADD FOREIGN KEY (pk_professor) REFERENCES professor (id);
ALTER TABLE turma ADD FOREIGN KEY (fk_disciplina) REFERENCES disciplina (id);
