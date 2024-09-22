class Funcionario {
    constructor(nome, idade, cargo) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return `Olá, meu nome é ${this.nome}! Tenho ${this.idade} anos e sou ${this.cargo}.`;
    }

    trabalhar() {
        return `${this.nome} trabalha como ${this.cargo}.`;
    }
}

class Gerente extends Funcionario {
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    gerenciar() {
        return `${this.nome} gerencia o departamento de ${this.departamento}.`;
    }
}

class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem) {
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    programar() {
        return `${this.nome} programa em ${this.linguagem}.`;
    }
}

function exibirErro(mensagem) {
    const divErro = document.getElementById('erro');
    divErro.textContent = mensagem;
}

document.getElementById('formFuncionario').addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const cargo = document.getElementById('cargo').value;
        const departamento = document.getElementById('departamento').value || null;
        const linguagem = document.getElementById('linguagem').value || null;

        if (!nome || isNaN(idade) || !cargo) {
            throw new Error('Por favor, preencha todos os campos obrigatórios.');
        }

        let funcionario;
        if (cargo.toLowerCase() === 'gerente') {
            if (!departamento) {
                throw new Error('Por favor, preencha o campo "Departamento" para Gerente.');
            }
            funcionario = new Gerente(nome, idade, cargo, departamento);
        } else if (cargo.toLowerCase() === 'desenvolvedor') {
            if (!linguagem) {
                throw new Error('Por favor, preencha o campo "Linguagem" para Desenvolvedor.');
            }
            funcionario = new Desenvolvedor(nome, idade, cargo, linguagem);
        } else {
            throw new Error('Cargo inválido. Por favor, use "Gerente" ou "Desenvolvedor".');
        }

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <p>${funcionario.seApresentar()}</p>
            <p>${funcionario.trabalhar()}</p>
        `;
        
        if (funcionario instanceof Gerente) {
            resultadoDiv.innerHTML += `<p>${funcionario.gerenciar()}</p>`;
        } else if (funcionario instanceof Desenvolvedor) {
            resultadoDiv.innerHTML += `<p>${funcionario.programar()}</p>`;
        }

        document.getElementById('erro').textContent = ''; 

    } catch (error) {
        exibirErro(error.message);
    }
});
