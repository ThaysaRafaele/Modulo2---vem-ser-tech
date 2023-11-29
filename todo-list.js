function action() {

  const userChoice = parseInt(document.getElementById('userChoice').value);

  const actionInput = message();
  
    switch (actionInput || userChoice) {
      case 1:
        addTodo();
        redo();
        break;

      case 2:
        try {
          editTodo(); 
          redo();         
        } catch (e) {
          console.log(e.message);
          redo();    
        }
        break;

      case 3:
        try {
          removeTodo();  
          redo();        
        } catch (e) {
          console.log(e.message);
          redo();    
        }
        break;

      case 4:
        listTodo();
        redo();
        break;

      case 5:
        try {
          getTodo();  
          redo();        
        } catch (e) {
          console.log(e.message);
          redo();    
        }
        break;
    
      default:
        console.log('Input inválido.');
        action();
        break;
    }

  return
}

function message() {
  console.log(`
  1 - Adicionar um tarefa.
  2 - Editar uma tarefa salva.
  3 - Remover uma tarefa salva.
  4 - Listar todas as tarefas salvas.
  5 - Obter uma tarefa salva.
  `);

  console.log('Selecione uma das opções acima (digite o número):');

  const messageInput = Number(prompt());

  return messageInput;
}

function addTodo() {
  const add = {};
  
  do {
    add.todo = prompt('Informe o seu todo: ');
    if (!add.todo.trim()) {
      console.log('Por favor, insira um todo válido.');
    }
  } while (!add.todo.trim());

  do {
    add.hour = prompt('Informe o horário do todo (no formato HH:MM): ');
    if (!add.hour.trim()) {
      console.log('Por favor, insira um horário válido.');
    }

    if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(add.hour.trim())) {
      console.log('Por favor, insira um horário válido no formato HH:MM.');
    }

  } while (!add.hour.trim() || !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(add.hour.trim()));
  
  console.log('Todo adicionado com sucesso');

  return todoList.push(add);
}

function editTodo() {
  if (todoList.length === 0) {
    console.log('Não há itens na lista.');
  } else {
    console.log('Informe o ID do todo:');
    console.log('(Exemplo: digite 1 para editar o primeiro todo)');
    listTodo();

    const todoID = Number(prompt());
    const index = todoID - 1;

    try {
      if (!todoID || todoID !== parseInt(todoID) || todoList.length <= index) {
        throw Error('ID inválido.');
      } else {
        let editTodo;
        do {
          editTodo = prompt('Edite o seu todo: ');
          if (editTodo === null) {
            console.log('Edição cancelada.');
            return; 
          }
          if (editTodo.trim() === '') {
            console.log('Por favor, insira um todo válido.');
          }
        } while (editTodo.trim() === '');

        let editHour;
        do {
          editHour = prompt('Edite o horário do todo (no formato HH:MM): ');
          if (!editHour.trim()) {
            console.log('Por favor, insira um horário válido.');
          }

          if (!/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(editHour.trim())) {
            console.log('Por favor, insira um horário válido no formato HH:MM.');
          }
        } while (!editHour.trim() || !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(editHour.trim()));

        todoList[index].todo = editTodo;
        todoList[index].hour = editHour;

        console.log('Todo editado com sucesso');
      }
    } catch (e) {
      console.log(e.message);
    }
  }
}


function removeTodo() {
  if (todoList.length === 0) {
    throw Error ('Não há items na lista.');
  } else {
    console.log('Informe o ID do todo:');
    console.log('(Exemplo: digite 1 para editar o primeiro todo)');
    const todoID = Number(prompt());

    const index = todoID - 1;

    try {
      if (!todoID || todoID !== parseInt(todoID) || todoList.length <= index) {
        throw Error ('ID inválido.');
      } else {
        todoList.splice(index, 1);
        
        console.log('Todo removido com sucesso'); 

        return
      }
    } catch (e) {
      console.log(e.message);
      removeTodo();
    }
  }
}

function listTodo() {
  if (todoList.length === 0) {
    console.log('Não há itens na lista.');
  } else {
    console.log(todoList);
  }
  return
}

function getTodo() {
  if (todoList.length === 0) {
    throw Error ('Não há items na lista.');
  } else {
    console.log('Informe o ID do todo:');
    console.log('(Exemplo: digite 1 para editar o primeiro todo)');
    const todoID = Number(prompt());

    console.log(todoID);
  
    const index = todoID - 1;

    try {
      if (!todoID || todoID !== parseInt(todoID) || todoList.length <= index) {
        throw Error ('ID inválido.');
      } else {
        console.log(todoList[index]);
        
        return
      }
    } catch (e) {
      console.log(e.message);
      getTodo();
    }
  }
}

function redo() {
  console.log('Deseja realizar mais alguma ação?');
  console.log('Digite (s) para sim e (n) para não.');
  const redoInput = prompt('').toLowerCase();

  try {
    if (redoInput === 's') {
      action();
    } else if (redoInput === 'n') {
      return
    } else {
      throw Error ('Opção inválida.');
    }
  } catch (e) {
    console.log(e.message);
    redo();
  }
}

console.log('Seja Bem Vindo!');

const prompt = require('prompt-sync')();

const todoList = [
  {
    todo: 'aula',
    hour: '19:00'
  },
  {
    todo: 'banho',
    hour: '22:00'
  },
  {
    todo: 'janta',
    hour: '22:30'
  }
];

action();

console.log('Finalizando...')