  const requestURL = 'https://jsonplaceholder.typicode.com/todos'
  const xhr = new XMLHttpRequest
  let answersFromServer
  let toDoLists = []

  xhr.open('GET', requestURL)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.responseType = 'json'

  xhr.onload = () => {
    if (xhr.status !== 200) {
      console.log('Провал')
    } else {
      console.log('Успешно')
      createNewElement();
    }
  }

  xhr.onerror = () => {
    console.log(xhr.response)
  }

  xhr.onreadystatechange = () => {
    if (xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      answersFromServer = xhr.response;
      let arr = [];
			for (let i=0;i <answersFromServer.length;i++) {
				arr.push(answersFromServer[i]);
			};
			toDoLists.push(
        (arr.filter(item => item.userId === 2).slice(0, 5)),
        (arr.filter(item => item.userId === 4).slice(0, 5)),
        (arr.filter(item => item.userId === 6).slice(0, 5))
      );
    }
  }
  xhr.send()
  

  function createNewElement() {
    let body = document.querySelector('body');
    for (let i = 0; i < toDoLists.length; i += 1) {
      let listToDo = document.createElement('div');
      body.appendChild(listToDo);
      let h1 = document.createElement('h1');
      listToDo.appendChild(h1)
      h1.innerText = `To-Do List for user № ${toDoLists[i][0].userId}`
      let list = document.createElement('ol');
      listToDo.appendChild(list)
      for (let j = 0; j < toDoLists[i].length; j++) {
        let li = document.createElement('li');
        list.appendChild(li)
        let inp = document.createElement('input');
        inp.disabled = true
        li.appendChild(inp)
        inp.value = `${toDoLists[i][j].title}`
      }
    }
  }


  